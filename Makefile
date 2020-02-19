clean:
	rm -rf public resources

prepare:
	cp -rf harbor/docs content
	rm -rf content/docs/*.md content/docs/prepare-swagger.sh content/docs/{adopters,security} content/docs/**/README.md

serve: prepare
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
	--minify

check-links: clean build link-checker-setup run-checker
