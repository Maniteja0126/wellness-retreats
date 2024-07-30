# Wellness Retreat

This repository contains the code for the Wellness Retreat project. It includes a frontend and backend application, along with deployment configurations using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Clone the Repository](#clone-the-repository)
- [Setup Without Docker](#setup-without-docker)
- [Setup With Docker](#setup-with-docker)
- [Deployment](#deployment)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Git
- Node.js (v14.x or later)
- Docker
- Docker Compose

## Clone the Repository

1. Clone the repository using Git:

    ```sh
    git clone https://github.com/Maniteja0126/wellness-retreats.git
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

1. **Navigate to the Docker Directory:**

    Ensure your `docker-compose.yml` file is in the appropriate directory, e.g., `docker` or the root of your project.

    ```sh
    cd docker
    ```

2. **Build and Start Containers Using Docker Compose:**

    ```sh
    docker-compose up --build
    ```

    This command will build the Docker images and start the containers for the backend, frontend, and database.

3. **Verify Services:**

    - **Frontend:** Access at `http://localhost:3000`
    - **Backend:** Access at `http://localhost:3001`
    - **Database:** Available only within the Docker network, not exposed directly

## Deployment

1. **Prepare Your EC2 Instance:**

    - Ensure Docker and Docker Compose are installed on your EC2 instance.
    - Set up SSH access to your EC2 instance.

2. **Deploy Using Docker Compose:**

    - **Transfer Docker Compose File and Code:**

        ```sh
        scp -i <your-ec2-key.pem> -r docker/* ec2-user@<ec2-instance-ip>:/home/ec2-user/app
        ```

    - **SSH into EC2 Instance:**

        ```sh
        ssh -i <your-ec2-key.pem> ec2-user@<ec2-instance-ip>
        ```

    - **Navigate to the Application Directory and Start Containers:**

        ```sh
        cd /home/ec2-user/app
        docker-compose up -d
        ```

    This will deploy the application on your EC2 instance using Docker Compose.

## Notes

- Make sure your environment variables are properly configured in `.env` files for both local development and production deployment.
- For security reasons, handle sensitive information like database credentials carefully, especially when transferring files to your EC2 instance.
