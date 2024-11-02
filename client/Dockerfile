# Stage 1: Build the Next.js project
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables for Next.js
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_PUBLIC_API_URL='http://localhost:8001'

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
