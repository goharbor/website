PAGEFIND_VERSION := 1.5.2
PAGEFIND := npx -y pagefind@$(PAGEFIND_VERSION)

clean:
	rm -rf public resources static/pagefind

prepare:
	$(CURDIR)/load-docs.sh

# Pagefind indexes the rendered HTML, so it always runs after hugo.
search-index:
	$(PAGEFIND) --site public

# `hugo server` never writes public/, so the index is built once up front and
# served out of static/ for the duration of the session.
serve:
	hugo \
		--buildDrafts \
		--buildFuture \
		--cleanDestinationDir
	$(PAGEFIND) --site public
	rm -rf static/pagefind && cp -r public/pagefind static/pagefind
	trap 'rm -rf static/pagefind' EXIT INT TERM; \
	hugo server \
		--bind 0.0.0.0 \
		--buildDrafts \
		--buildFuture \
		--disableFastRender

production-build: prepare
	hugo
	$(MAKE) search-index

preview-build: prepare
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture
	$(MAKE) search-index

link-checker-setup:
	curl https://htmltest.wjdp.uk | bash

run-checker:
	bin/htmltest

build:
	hugo \
		--buildDrafts \
		--buildFuture
	$(MAKE) search-index

check-internal-links: clean build link-checker-setup run-checker

check-all-links: clean build link-checker-setup
	bin/htmltest --conf .htmltest.external.yml

.PHONY: clean prepare search-index serve production-build preview-build \
	link-checker-setup run-checker build check-internal-links check-all-links
