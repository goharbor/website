clean:
	rm -rf public resources

prepare:
	git submodule update --init --remote --merge
	cp -rf harbor/docs content
	rm -rf content/docs/*.md content/docs/prepare-swagger.sh content/docs/{adopters,security} content/docs/**/README.md

serve:
	hugo server \
		--buildDrafts \
		--buildFuture \
		--disableFastRender

production-build: prepare
	hugo \
	--minify

preview-build: prepare
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \
		--minify

link-checker-setup:
	curl https://htmltest.wjdp.uk | bash

run-checker:
	bin/htmltest

build:
	hugo \
	--buildDrafts \
	--buildFuture \
	--minify

check-internal-links: clean build link-checker-setup run-checker

check-all-links: clean build link-checker-setup
	bin/htmltest --conf .htmltest.external.yml
