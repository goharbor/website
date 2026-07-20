#!/bin/bash
set -e

# Install precompiled Dart Sass binary for Hugo
SASS_VERSION="1.77.0"
SASS_DIR="node_modules/.bin"

# Check if already installed
if [ -x "$SASS_DIR/sass" ] && "$SASS_DIR/sass" --version >/dev/null 2>&1; then
  echo "✓ Dart Sass already installed, skipping"
  exit 0
fi

TEMP_DIR=$(mktemp -d)
mkdir -p "$SASS_DIR"

# Detect platform
ARCH=$(uname -m)
OS=$(uname -s)

if [ "$OS" = "Linux" ] && [ "$ARCH" = "x86_64" ]; then
  PLATFORM="linux-x64"
elif [ "$OS" = "Darwin" ] && [ "$ARCH" = "arm64" ]; then
  PLATFORM="macos-arm64"
elif [ "$OS" = "Darwin" ] && [ "$ARCH" = "x86_64" ]; then
  PLATFORM="macos-x64"
else
  echo "Unsupported platform: $OS $ARCH"
  exit 1
fi

# Download and extract Dart Sass
DOWNLOAD_URL="https://github.com/sass/dart-sass/releases/download/${SASS_VERSION}/dart-sass-${SASS_VERSION}-${PLATFORM}.tar.gz"
echo "Downloading Dart Sass $SASS_VERSION from $DOWNLOAD_URL..."

if ! curl -sL "$DOWNLOAD_URL" | tar xz -C "$TEMP_DIR"; then
  echo "Failed to download or extract Dart Sass"
  rm -rf "$TEMP_DIR"
  exit 1
fi

# Copy the entire dart-sass directory to node_modules/.bin
cp -r "$TEMP_DIR/dart-sass"/* "$SASS_DIR/"
rm -rf "$TEMP_DIR"

# Verify it works
if "$SASS_DIR/sass" --version; then
  echo "✓ Dart Sass $SASS_VERSION installed successfully"
else
  echo "✗ Dart Sass installation failed"
  exit 1
fi
