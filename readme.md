# Deployment Instructions for Orchestration

## Initial Setup

Before proceeding, ensure that `setup.sh` has the necessary permissions:

```sh
chmod +x setup.sh
```

After granting permissions, execute the script to complete the deployment:

```sh
./setup.sh
```

## Updating Docker Compose Configuration

In case of recent modifications to the `docker-compose.yml` file (e.g., changes in port mappings), apply these changes by restarting the Docker services. This ensures your updates are active:

```sh
docker-compose down
docker-compose up --build
```

Upon successful configuration, you should see an output similar to the one below, indicating that the setup is correctly configured.
![This represents the configuration is good.](pics/dockerbuild.png)

## Verifying Service Accessibility

After setup, verify the accessibility of the device integration and frontend services using the following commands:

### Accessing Device Integration:

```sh
# Access the device integration base endpoint
curl http://localhost:3000
# Expected response: {"message":"Hello World!"}

# Access the Philips endpoint
curl http://localhost:3000/philips
# Expected response: {"code":1,"msg":"Hello from Philips"}

# Access the LIFX endpoint
curl http://localhost:3000/lifx
# Expected response: {"code":1,"msg":"Hello from LIFX"}
```

### Accessing the Frontend:

To access the frontend service:

```sh
curl http://localhost:8080
```

Follow these instructions to ensure your deployment is correctly set up and all services are accessible as intended.




