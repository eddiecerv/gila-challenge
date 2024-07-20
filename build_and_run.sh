#!/bin/bash

# Salir inmediatamente si un comando falla
set -e

# Ruta a los directorios de los proyectos
UI_DIR="./gila-notification-ui"
API_DIR="./gila-notification-api"

# Construir el contenedor Docker para el proyecto Next.js
echo "Building Docker image for UI..."
cd $UI_DIR
docker build -t gila-notification-ui .

# Volver a la raíz del proyecto
cd ..

# Construir el contenedor Docker para el proyecto NestJS
echo "Building Docker image for API..."
cd $API_DIR
docker build -t gila-notification-api .

# Volver a la raíz del proyecto
cd ..

# Correr docker-compose para levantar los contenedores
echo "Running docker-compose..."
docker-compose up -d

echo "Containers are up and running."