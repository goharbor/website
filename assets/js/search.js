/*
 * Pagefind-backed site search.
 *
 * The index is built from public/ on every deploy (see the Makefile), so it can
 * never drift from the published site the way the previous crawler-based search
 * did.
 *
 * Scoping: every page carries a `scope` filter -- docs pages get their Harbor
 * version ("2.15.0"), everything else gets "site". Queries ask for
 * `{ scope: { any: [version, "site"] } }`, which returns exactly one version of
 * the docs plus all the unversioned pages (blog, community, CLI docs, home).
 * Pagefind ANDs filter values by default, so the `any` keyword is what makes
 * this an OR rather than an impossible "is both 2.15.0 and site".
 */
document.addEventListener('alpine:init', function () {
  Alpine.data('harborSearch', function () {
    return {
      open: false,
      query: '',
      groupedResults: {},
      sectionOrder: [],
      filters: {},
      activeType: 'all',
      // Version whose docs are searched. Always a concrete release once the
      // index has loaded -- there is deliberately no "all versions" option,
      // since one query would then return the same page once per release.
      version: '',
      versions: [],
      selectedIndex: 0,
      totalResults: [],
      loading: false,
      pagefind: null,

      init: function () {
        var self = this;
        // Default to the version of the page we are on, falling back to the
        // latest release when the reader is not inside the docs.
        this.version = this.$root.dataset.docsVersion ||
          this.$root.dataset.latestVersion || '';
        var isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        document.addEventListener('keydown', function (e) {
          var modKey = isMac ? e.metaKey : e.ctrlKey;
          if (modKey && e.key === 'k') {
            e.preventDefault();
            if (self.open) {
              self.closeModal();
            } else {
              self.openModal();
            }
          }
        });
      },

      openModal: async function () {
        this.open = true;
        document.documentElement.classList.add('has-search-open');
        if (!this.pagefind) {
          try {
            this.pagefind = await import('/pagefind/pagefind.js');
            await this.pagefind.init();
            this.filters = await this.pagefind.filters();
            this.versions = this.sortVersions(
              Object.keys(this.filters.scope || {}).filter(function (s) {
                return s !== 'site';
              })
            );
            // Fall back to the newest indexed release whenever the page's own
            // version is absent -- either because we are outside the docs, or
            // because config.toml names a release that was not built.
            if (this.versions.indexOf(this.version) === -1) {
              this.version = this.versions[0] || '';
            }
            this.syncVersionSelect();
          } catch (err) {
            console.error('Failed to load Pagefind:', err);
          }
        }
        var self = this;
        this.$nextTick(function () {
          if (self.$refs.searchInput) {
            self.$refs.searchInput.focus();
          }
        });
        if (this.query) {
          this.search();
        }
      },

      closeModal: function () {
        this.open = false;
        document.documentElement.classList.remove('has-search-open');
        this.query = '';
        this.clearResults();
      },

      clearResults: function () {
        this.groupedResults = {};
        this.sectionOrder = [];
        this.totalResults = [];
        this.selectedIndex = 0;
      },

      /*
       * The <option>s are rendered from the index, so they do not exist yet when
       * the component initialises. x-model would bind against that empty list
       * and leave the control reading "All versions" while the query is in fact
       * scoped, so the value is pushed to the element once the options are in
       * the DOM.
       */
      syncVersionSelect: function () {
        var self = this;
        this.$nextTick(function () {
          if (self.$refs.versionSelect) {
            self.$refs.versionSelect.value = self.version;
          }
        });
      },

      /*
       * Descending numeric-segment sort, so 2.15.0 outranks 2.9.0 and the
       * unversioned dev branches sink to the bottom. Comparing the raw strings
       * would put "2.9.0" above "2.15.0".
       */
      sortVersions: function (versions) {
        var weigh = function (v) {
          var parts = v.split('.').map(function (p) {
            var n = parseInt(p, 10);
            return isNaN(n) ? -1 : n;
          });
          while (parts.length < 3) { parts.push(0); }
          return parts;
        };
        return versions.slice().sort(function (a, b) {
          var isNumA = /^\d/.test(a);
          var isNumB = /^\d/.test(b);
          if (isNumA !== isNumB) { return isNumA ? -1 : 1; }
          if (!isNumA) { return a.localeCompare(b); }
          var wa = weigh(a);
          var wb = weigh(b);
          for (var i = 0; i < Math.max(wa.length, wb.length); i++) {
            var diff = (wb[i] || 0) - (wa[i] || 0);
            if (diff !== 0) { return diff; }
          }
          return 0;
        });
      },

      search: async function () {
        if (!this.query || !this.pagefind) {
          this.clearResults();
          return;
        }

        this.loading = true;

        var filters = {};
        if (this.version) {
          filters.scope = { any: [this.version, 'site'] };
        }
        // "Website" is not a facet value; it stands for every type that is not
        // versioned docs, so it expands to an `any` over the remaining keys.
        if (this.activeType === 'Docs') {
          filters.type = ['Docs'];
        } else if (this.activeType === 'Website') {
          filters.type = { any: this.websiteTypes() };
        }
        var opts = Object.keys(filters).length ? { filters: filters } : {};

        var search = await this.pagefind.debouncedSearch(this.query, opts, 300);
        if (search === null) return; // superseded by a newer search

        var loaded = await Promise.all(
          search.results.slice(0, 20).map(function (r) { return r.data(); })
        );

        var grouped = {};
        var order = [];
        var self = this;
        loaded.forEach(function (result) {
          var group = self.groupOf(result);
          if (!grouped[group]) {
            grouped[group] = [];
            order.push(group);
          }
          grouped[group].push(result);
        });

        this.groupedResults = grouped;
        this.sectionOrder = order;

        // Flat list mirroring render order, for arrow-key navigation.
        var flat = [];
        order.forEach(function (group) {
          grouped[group].forEach(function (result) {
            flat.push(result);
          });
        });
        this.totalResults = flat;
        this.selectedIndex = 0;
        this.loading = false;
      },

      groupOf: function (result) {
        var type = (result.filters && result.filters.type && result.filters.type[0]) || 'Other';
        var version = this.versionOf(result);
        return version ? type + ' ' + version : type;
      },

      versionOf: function (result) {
        return (result.meta && result.meta.version) || '';
      },

      setType: function (type) {
        this.activeType = type;
        this.search();
      },

      setVersion: function (version) {
        this.version = version;
        // Picking a release is an implicit "show me the docs": without this the
        // two halves of the split button act independently and the user has to
        // choose a version and then click Docs to see any effect.
        this.activeType = 'Docs';
        this.search();
      },

      navigate: function (url) {
        if (url) {
          window.location.href = url;
        }
        this.closeModal();
      },

      handleKeydown: function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (this.selectedIndex < this.totalResults.length - 1) {
            this.selectedIndex++;
          }
          this.scrollSelectedIntoView();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (this.selectedIndex > 0) {
            this.selectedIndex--;
          }
          this.scrollSelectedIntoView();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (this.totalResults[this.selectedIndex]) {
            this.navigate(this.totalResults[this.selectedIndex].url);
          }
        }
      },

      scrollSelectedIntoView: function () {
        var self = this;
        this.$nextTick(function () {
          var active = self.$refs.resultsList
            ? self.$refs.resultsList.querySelector('.search-result--active')
            : null;
          if (active) {
            active.scrollIntoView({ block: 'nearest' });
          }
        });
      },

      isSelected: function (result) {
        return this.totalResults.indexOf(result) === this.selectedIndex;
      },

      hasFilters: function () {
        return !!(this.filters.type && Object.keys(this.filters.type).length);
      },

      hasType: function (type) {
        return !!(this.filters.type && this.filters.type[type] !== undefined);
      },

      // The finer types (Blog, CLI Docs, Community, Home) still drive the
      // result group headings; they are only collapsed in the filter row.
      websiteTypes: function () {
        var types = this.filters.type ? Object.keys(this.filters.type) : [];
        return types.filter(function (t) { return t !== 'Docs'; }).sort();
      }
    };
  });
});
