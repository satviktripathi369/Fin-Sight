FROM docker:dind

WORKDIR /app
# Install Docker Compose
RUN apk add --no-cache curl && \
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

COPY docker-compose.azure.yaml docker-compose.yaml

CMD ["docker-compose","up"]