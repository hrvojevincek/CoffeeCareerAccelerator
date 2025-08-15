# ☕ Coffee Career Accelerator

A full-stack job board platform that connects coffee industry professionals with employment opportunities. Built with modern technologies for a seamless job search experience.

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, Context API
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL (Docker for local development)
- **Package Manager**: npm (with Turborepo for monorepo management)

## 📋 Prerequisites

- **Node.js**: Version 18.x or higher
- **Docker**: For local PostgreSQL database
- **Git**: For version control

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hrvojevincek/CoffeeCareerAccelerator.git
cd CoffeeCareerAccelerator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `apps/server/` directory:

```bash
# Local Docker PostgreSQL Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/jobsboard"
LOCAL_DATABASE_URL="postgresql://postgres:postgres@localhost:5434/jobsboard"

# Development environment
NODE_ENV=development

# JWT Secrets (replace with your own secure secrets)
JWT_SECRET="your_secure_jwt_secret_here_minimum_32_characters_long"
JWT_REFRESH_SECRET="your_secure_refresh_secret_here_minimum_32_characters_long"
COOKIE_SECRET="your_secure_cookie_secret_here_minimum_32_characters_long"

# Other configuration
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=7200000
```

### 4. Start Development Environment

#### **Option A: Start Everything (Recommended)**

```bash
npm run dev
```

This will automatically:

- 🐳 Start Docker PostgreSQL container
- 🔧 Generate Prisma client
- 🚀 Start both frontend and backend servers

#### **Option B: Start Individual Services**

```bash
# Start only the backend (with Docker database)
cd apps/server
npm run dev

# Start only the frontend
cd apps/client
npm run dev
```

### 5. Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Database**: PostgreSQL on localhost:5434

## 🗄️ Database Management

### **Local Docker Database**

- **Host**: localhost:5434
- **Database**: jobsboard
- **Username**: postgres
- **Password**: postgres

### **Database Commands**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npx prisma db seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

### **Docker Commands**

```bash
# Stop database
npm run docker:stop

# Restart database
npm run docker:restart

# View running containers
docker ps
```

## 🔧 Available Scripts

### **Root Level (Monorepo)**

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build all applications
- `npm run lint` - Run linting across all packages

### **Backend (apps/server)**

- `npm run dev` - Start server with Docker database
- `npm run dev:local` - Force local Docker database
- `npm run docker:stop` - Stop Docker container
- `npm run docker:restart` - Restart Docker container
- `npm run seed` - Seed database with sample data

### **Frontend (apps/client)**

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
