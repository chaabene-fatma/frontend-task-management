# Use Node.js 22 image for building the Angular app
FROM node:22 as build

# Set the working directory
WORKDIR /app

# Copy package.json  then install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files and build the Angular app
COPY . ./
RUN npm run build --configuration=production

# Use an Nginx image to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/frontend-task-management /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
