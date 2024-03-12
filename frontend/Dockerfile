# Dockerfile
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
