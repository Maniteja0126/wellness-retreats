# Wellness Retreat

This repository contains the code for the Wellness Retreat project. It includes a frontend and backend application, along with deployment configurations for Kubernetes and Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Clone the Repository](#clone-the-repository)
- [Setup Without Docker](#setup-without-docker)
- [Setup With Docker](#setup-with-docker)
- [Kubernetes Deployment](#kubernetes-deployment)


## Prerequisites

Before setting up the project, ensure you have the following installed:

- Git
- Node.js (v14.x or later)
- Docker (for Docker setup)
- Docker Compose (for Docker setup)

## Clone the Repository

1. Clone the repository using Git:

    ```sh
    git clone https://github.com/<your-username>/wellness-retreat.git
    cd wellness-retreat
    ```

## Setup Without Docker

1. **Navigate to the Backend Directory:**

    ```sh
    cd backend
    ```

2. **Install Backend Dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` File**: Copy the `.env.example` to `.env` and fill in your environment variables.

    ```sh
    cp .env.example .env
    ```

4. **Run Database Migrations:**

    ```sh
    npx prisma migrate deploy
    ```

5. **Start the Backend Server:**

    ```sh
    npm start
    ```

6. **Navigate to the Frontend Directory:**

    ```sh
    cd ../frontend
    ```

7. **Install Frontend Dependencies:**

    ```sh
    npm install
    ```

8. **Create a `.env` File**: Copy the `.env.example` to `.env` and fill in your environment variables.

    ```sh
    cp .env.example .env
    ```

9. **Start the Frontend Server:**

    ```sh
    npm run dev
    ```

## Setup With Docker

1. **Build and Start Containers Using Docker Compose:**

    Navigate to the `k8s` directory (or where your `docker-compose.yml` is located):

    ```sh
    cd k8s
    ```

2. **Build and Start the Containers:**

    ```sh
    docker-compose up --build
    ```

    This command will build the Docker images and start the containers for the backend, frontend, and database.

3. **Verify Services:**

    - **Frontend:** Access at `http://localhost:3000`
    - **Backend:** Access at `http://localhost:3001`
    - **Database:** Available only within the Docker network, not exposed directly

## Kubernetes Deployment

To deploy the application on a Kubernetes cluster, ensure you have a configured Kubernetes cluster and `kubectl` set up.

1. **Apply Kubernetes Secrets:**

    ```sh
    kubectl apply -f k8s/secret.yaml
    ```

2. **Deploy the Backend:**

    ```sh
    kubectl apply -f k8s/backend-deployment.yml
    ```

3. **Deploy the Frontend:**

    ```sh
    kubectl apply -f k8s/frontend-deployment.yml
    ```

4. **Deploy the Database:**

    ```sh
    kubectl apply -f k8s/db-deployment.yml
    ```

5. **Expose Services:**

    ```sh
    kubectl apply -f k8s/service.yaml
    ```



