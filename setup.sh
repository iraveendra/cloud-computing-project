#!/bin/bash
set -e

# Ensure Docker service is running
#sudo systemctl start docker

# Check if this node is part of a swarm and leave if it is
if [ "$(docker info --format '{{.Swarm.LocalNodeState}}')" == "active" ]; then
  echo "Node is part of a swarm. Leaving the swarm..."
  docker swarm leave --force
fi

# Initialize the swarm (needed once for the first time)
echo "Initializing new swarm..."
docker swarm init

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
docker volume rm homeautomation_db_data || true  # The `|| true` part will ignore errors if the volume doesn't exist

# Start Docker Compose services
docker-compose up -d
