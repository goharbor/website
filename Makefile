clean:
	rm -rf public resources

prepare:
	$(CURDIR)/load-docs.sh

serve:
	hugo server \
		--buildDrafts \
		--buildFuture \
		--disableFastRender

production-build: prepare
	hugo \


preview-build: prepare
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \


link-checker-setup:
	curl https://htmltest.wjdp.uk | bash

run-checker:
	bin/htmltest

build:
	hugo \
	--buildDrafts \
	--buildFuture \


check-internal-links: clean build link-checker-setup run-checker

check-all-links: clean build link-checker-setup
	bin/htmltest --conf .htmltest.external.yml
