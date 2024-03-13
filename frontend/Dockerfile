# Use a node base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend application
COPY . .

# Build your app
RUN npm run build

# Use nginx to serve the React app
FROM nginx:alpine

# Install required packages and faas-cli
RUN apk add --no-cache curl \
    && curl -sSL https://cli.openfaas.com | sh

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


# Copy your build directory
COPY ./build /usr/share/nginx/html

# Expose port 80 (can be mapped to 8080 in docker-compose)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]