FROM debian:bookworm-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    nodejs \
    npm && \
    rm -rf /var/lib/apt/lists/*

# Install Hugo 0.163.3 extended
RUN wget -q https://github.com/gohugoio/hugo/releases/download/v0.163.3/hugo_extended_0.163.3_linux-amd64.tar.gz && \
    tar xzf hugo_extended_0.163.3_linux-amd64.tar.gz -C /usr/local/bin && \
    rm hugo_extended_0.163.3_linux-amd64.tar.gz && \
    hugo version

WORKDIR /site

# Copy project files
COPY . /site/

# Install npm dependencies
RUN npm install

# Expose Hugo server port
EXPOSE 1313

# Default command: run Hugo server
CMD ["hugo", "server", "--bind", "0.0.0.0", "--buildDrafts", "--buildFuture", "--disableFastRender"]
