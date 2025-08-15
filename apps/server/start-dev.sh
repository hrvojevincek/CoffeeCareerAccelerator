#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🐳 Starting Docker PostgreSQL..."
cd "$PROJECT_ROOT"
docker-compose up -d

echo "📡 Using Local Docker PostgreSQL..."
cd "$SCRIPT_DIR"

echo "🔧 Generating Prisma client..."
DOCKER_ENV=true npx prisma generate

echo "🚀 Starting development server..."
echo "🔍 Debug: DOCKER_ENV=$DOCKER_ENV"
echo "🔍 Debug: NODE_ENV=$NODE_ENV"
DOCKER_ENV=true NODE_ENV=development nodemon ./src/index.ts
