clean:
	rm -rf public resources

prepare:
	git submodule foreach git merge origin/master
	cp -rf harbor/docs content
	rm -rf content/docs/*.md content/docs/prepare-swagger.sh content/docs/{adopters,security}

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

check-links: clean prepare production-build link-checker-setup run-checker
