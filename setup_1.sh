#!/bin/bash
set -e

# Build the frontend
cd frontend
npm install
npm run build
cd ..

# Set permissions for the MongoDB init script
chmod +x ./dashboard-backend/data/mongo-init.sh

# Stop Docker Compose services if they are running
docker-compose down

# Remove the existing data volume (Warning: This will delete all the data)
docker volume rm db_data || true  # The `|| true` part will ignore errors if the volume doesn't exist

# Start Docker Compose services
docker-compose up -d