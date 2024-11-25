# Official Node.js LTS base image
FROM node:20.12.2-alpine as builder

# Set the working directory
WORKDIR /app

# Define ARG variables with BAKED_ prefix for each environment variable
ARG NEXT_PUBLIC_API_URL=BAKED_NEXT_PUBLIC_API_URL

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
# Copy the rest of your app's source code
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi
# Start a new stage from the minimal base image
FROM node:20.12.2-alpine

WORKDIR /app

# Copy build artifacts and lock files conditionally using patterns
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn*.lock* ./yarn.lock 
COPY --from=builder /app/package-lock*.json ./package-lock.json  
COPY --from=builder /app/pnpm-lock*.yaml ./pnpm-lock.yaml 

# Create a new directory for custom scripts
RUN mkdir -p /var/local

# Copy the script into the correct location
COPY entrypoint.sh /var/local/entrypoint.sh

# Install necessary packages
USER root
RUN apk update && apk add bash

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
RUN chmod +x /var/local/entrypoint.sh

USER appuser

# Install production dependencies
RUN \
  if [ -f yarn.lock ]; then yarn install; \
  elif [ -f package-lock.json ]; then npm install; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install; \
  else echo "cant install" && exit 1; \
  fi
# Expose the port Next.js runs on
EXPOSE 5000

# Set entrypoint to run entrypoint.sh
ENTRYPOINT ["/bin/bash", "/var/local/entrypoint.sh"]

# CMD to start the app
CMD ["yarn", "start", "-p", "5000"]