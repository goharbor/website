#!/bin/bash

# Step 1: Clone the required repositories
HARBOR_CLI_REPO="https://github.com/goharbor/harbor-cli.git"

# Step 2: Fetch the latest tag from the repository
LATEST_TAG=$(
  git ls-remote --tags --sort='v:refname' "$HARBOR_CLI_REPO" |
  tail -n1 |
  awk -F/ '{print $3}'
)

# # Step 3: Clone the repository at the latest tag
git clone --depth 1 --branch "$LATEST_TAG" "$HARBOR_CLI_REPO" harbor-cli 

# Step 4: Copy the CLI documentation to the website directory
HARBOR_CLI_DOCS="harbor-cli/doc/"
WEBSITE_CLI_DOCS="content/cli-docs"
rsync -av --delete --prune-empty-dirs \
      --exclude '*.go' \
      --exclude 'man-docs' \
      --exclude 'README.md' \
      "$HARBOR_CLI_DOCS" \
      "$WEBSITE_CLI_DOCS"

# Step 5: Clean up the cloned repository
rm -rf harbor-cli
