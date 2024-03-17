FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Update the npm package
RUN apk update && apk add npm
# Install dependencies
RUN npm i


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage for running tests
FROM builder AS test

# Run tests
RUN npm run test

# Stage for serving the built application
FROM nginx:alpine AS serve

# Copy build from builder stage to serve stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
