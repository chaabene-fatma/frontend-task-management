FROM node:22-alpine as dist

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the application
ARG NODE_ENV=production
RUN npm run build --configuration=${NODE_ENV}

FROM nginx:alpine-slim

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=dist app/dist/frontend-task-management/browser .
