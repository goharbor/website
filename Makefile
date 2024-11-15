HUGO_VERSION_REQUIRED="v0.74.0"
EXTENDED_REQUIRED="extended"

check_hugo_version:
	@version=$$(hugo version | head -n 1 | awk '{print $$5}' | sed 's/-.*//'); \
	extended=$$(hugo version | head -n 1 | grep -o 'extended'); \
	if [ "$$version" != "$(HUGO_VERSION_REQUIRED)" ] || [ "$$extended" != "$(EXTENDED_REQUIRED)" ]; then \
		echo "Error: Current Hugo version is $$version. AND is not $(HUGO_VERSION_REQUIRED) extended version."; \
		exit 1; \
	else \
		echo "Hugo version $$version is correct and is extended version."; \
	fi

clean:
	rm -rf public resources

prepare:
	$(CURDIR)/load-docs.sh

serve: check_hugo_version
	hugo server \
		--bind 0.0.0.0 \
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
