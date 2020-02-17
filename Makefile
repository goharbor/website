clean:
	rm -rf public resources

prepare:
	git submodule foreach git merge origin/master
	cp -rf harbor/docs content

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

check-links: clean production-build link-checker-setup run-checker
