
# Use an official Node.js runtime as the base image
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

RUN echo $(pwd)
# Copy package.json and package-lock.json (if present) to the working directory
COPY pnpm-lock.yaml package*.json ./

# Install pnpm
RUN npm install -g pnpm

# Copy the entire application code to the working directory
COPY . .

# Install application dependencies
RUN pnpm install

# Build the Hono.js application (if using TypeScript, for example)
# Replace 'npm run build' with your specific build command if needed
RUN pnpm run build:api

# Production stage

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/packages/api/package.json ./packages/api/package.json

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run db:generate
RUN pnpm run db:migrate

# Expose the port your Hono.js application listens on
EXPOSE 9999

# Define the command to run your Hono.js application
# Replace 'npm start' with your specific start command if needed
CMD ["pnpm", "start:api"]
