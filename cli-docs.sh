#!/bin/bash

# Step 1: Clone the required repositories
HARBOR_CLI_REPO="https://github.com/goharbor/harbor-cli.git"

# Clone both repos if not already cloned
if [ ! -d "harbor-cli" ]; then
  git clone $HARBOR_CLI_REPO
fi

# Define the paths for relevant folders
HARBOR_CLI_DOCS="harbor-cli/doc/cli-docs"
WEBSITE_CLI_DOCS="content/cli-docs/cli-docs"

# Step 2: Check for missing files
# List files in both directories

CLI_FILES_HARBOR_CLI=$(ls $HARBOR_CLI_DOCS)
CLI_FILES_WEBSITE=$(ls $WEBSITE_CLI_DOCS)

# Find files in harbor-cli that are not present in website's cli-docs folder

MISSING_FILES=()
for FILE in $CLI_FILES_HARBOR_CLI; do
  FILENAME=$(basename "$FILE")
  if [ ! -f "$WEBSITE_CLI_DOCS/$FILENAME" ]; then
    MISSING_FILES+=("$FILENAME")
  fi
done

# Step 3: Copy missing files
if [ ${#MISSING_FILES[@]} -eq 0 ]; then
  echo "No missing files."
else
  echo "Copying missing files..."
  for FILE in "${MISSING_FILES[@]}"; do
    cp "$HARBOR_CLI_DOCS/$FILE" "./content/cli-docs/cli-docs"
    echo "Copied $FILE successfully"
  done
  
fi

rm -rf harbor-cli
