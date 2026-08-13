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
      // Set when Pagefind itself fails (index missing, chunk load rejected).
      // Without it the modal degrades to a bare input with no filters and no
      // explanation, which reads as intentional rather than broken.
      searchError: false,
      pagefind: null,
      // Element that opened the modal, so focus can be handed back on close.
      trigger: null,
      // Monotonic token identifying the newest search; anything older that
      // resolves late is discarded rather than allowed to overwrite the UI.
      searchToken: 0,

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
        if (!this.open) {
          this.trigger = document.activeElement;
        }
        this.open = true;
        document.documentElement.classList.add('has-search-open');

        // Focus before the awaits below, not after. On a cold open the Pagefind
        // import and filter request can take hundreds of ms, and until focus is
        // inside the dialog trapFocus has nothing to contain -- Tab would walk
        // the obscured page behind an already-visible modal.
        var self = this;
        this.$nextTick(function () {
          if (self.$refs.searchInput) {
            self.$refs.searchInput.focus();
          }
        });

        if (!this.pagefind) {
          try {
            var pagefind = await import('/pagefind/pagefind.js');
            await pagefind.init();
            this.filters = await pagefind.filters();
            // Assigned only once fully initialised. Assigning before init()
            // would leave a half-built instance cached after a transient
            // failure, and the guard above would never retry it.
            this.pagefind = pagefind;
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
            this.searchError = false;
          } catch (err) {
            this.pagefind = null; // allow a later open to retry
            this.searchError = true;
            console.error('Failed to load Pagefind:', err);
          }
        }
        if (this.query) {
          this.search();
        }
      },

      closeModal: function () {
        this.open = false;
        document.documentElement.classList.remove('has-search-open');
        this.query = '';
        this.clearResults();
        this.loading = false;
        // Orphan any search still in flight. Without this it keeps the current
        // token, so it passes the staleness checks and writes its results into
        // the closed modal -- which then reopens showing hits for a query the
        // user never sees.
        this.searchToken++;
        // Hand focus back to whatever opened the dialog, or the keyboard user
        // is dropped at the top of the document.
        var trigger = this.trigger;
        this.trigger = null;
        if (trigger && trigger !== document.body && trigger.isConnected &&
            typeof trigger.focus === 'function') {
          this.$nextTick(function () { trigger.focus(); });
        }
      },

      /*
       * Keep Tab inside the dialog. Without this, `aria-modal="true"` is a
       * promise the markup does not keep: focus walks into the obscured page
       * behind the modal, where the dialog's own key handlers no longer fire.
       */
      focusables: function () {
        if (!this.$refs.modal) return [];
        var nodes = this.$refs.modal.querySelectorAll(
          'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])'
        );
        return Array.prototype.slice.call(nodes).filter(function (el) {
          return el.offsetParent !== null;
        });
      },

      trapFocus: function (e) {
        if (e.key !== 'Tab') return;
        var items = this.focusables();
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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
        // Claim the newest token up front. Pagefind's debounce only cancels a
        // call still inside its window -- one that has already started loading
        // result data will run to completion and would otherwise repopulate the
        // modal after the query moved on, or was cleared entirely.
        var token = ++this.searchToken;

        if (!this.query || !this.pagefind) {
          this.clearResults();
          this.loading = false;
          return;
        }

        this.loading = true;
        this.searchError = false;

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

        // Either await can reject -- a lazily fetched index chunk or result
        // fragment that fails to load. Unhandled, that leaves the spinner up
        // for good and raises an unhandled rejection.
        try {
          var search = await this.pagefind.debouncedSearch(this.query, opts, 300);
          if (search === null || token !== this.searchToken) return;

          var loaded = await Promise.all(
            search.results.slice(0, 20).map(function (r) { return r.data(); })
          );
          // The awaits above can outlive this search; the newer one owns the UI,
          // including `loading`, so bail without touching either.
          if (token !== this.searchToken) return;

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
        } catch (err) {
          // A stale search failing is not interesting; the newer one owns the UI.
          if (token !== this.searchToken) return;
          console.error('Search failed:', err);
          this.clearResults();
          this.searchError = true;
          this.loading = false;
        }
      },

      groupOf: function (result) {
        var type = (result.filters && result.filters.type && result.filters.type[0]) || 'Other';
        var version = this.versionOf(result);
        return version ? type + ' ' + version : type;
      },

      versionOf: function (result) {
        return (result.meta && result.meta.version) || '';
      },

      // Both failure modes are recoverable: a missing index may appear on the
      // next request, and a dropped chunk usually refetches.
      retry: async function () {
        this.searchError = false;
        if (!this.pagefind) {
          await this.openModal(); // re-runs the init block
        }
        if (this.query) {
          this.search();
        }
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

      /*
       * Results are real anchors, so the browser is left to navigate them.
       * Swallowing the click and assigning window.location would break
       * Cmd/Ctrl-click, shift-click and middle-click into a new tab or window.
       */
      onResultClick: function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          return;
        }
        this.closeModal();
      },

      // Keyboard activation (Enter) has no anchor default to rely on.
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

      resultId: function (result) {
        return 'search-result-' + this.totalResults.indexOf(result);
      },

      // Points the combobox at the arrow-key selection so it is announced.
      activeDescendantId: function () {
        return this.totalResults.length ? 'search-result-' + this.selectedIndex : null;
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
