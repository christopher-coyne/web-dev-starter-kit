# Web Development Starter Kit

A web starter kit meant to be cloned and used for future projects, as a way to cut down on time spent setting up boilerplate.

## Technologies

### Frontend

- **React Router 7** - React with SSR
- **shadcn/ui + Tailwind CSS** - For extensibility and rapid designing
- **React Query** - Caching and Querying
- **Lucide Icons** - Consistent Icons
- **Vite** - Built tool for RR7

### Backend

- **NestJS + Swagger** - Backend organized into modules, Swagger page provided
- **PostgreSQL** - Standard relational database
- **Prisma ORM** - Type-safe database client and schema management (may migrate to kysely at a later point)
- **Clerk** - Authentication and User Management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **Docker** and **Docker Compose** (for database)
- **Git**

## 🛠️ Getting Started

### 1. Clone the Repository

### 2. Environment Setup

#### Backend Environment

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Configure your environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"

# Clerk Authentication
CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Application
PORT=3001
NODE_ENV=development
```

#### Frontend Environment

Create a `.env` file in the `frontend` directory:

```bash
cd ../frontend
cp .env.example .env
```

Configure your frontend environment:

```env
VITE_API_URL=http://localhost:3001
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
```

### 3. Database Setup

Start the PostgreSQL database using Docker:

```bash
# From the root directory
docker-compose up -d
```

Run database migrations:

```bash
cd backend
yarn install
npx prisma migrate deploy
npx prisma generate
```

### 4. Install Dependencies & Start Development Servers

#### Backend

```bash
cd backend
yarn install
yarn start:dev
```

The backend will be available at `http://localhost:3001`

- API documentation (Swagger): `http://localhost:3001/api`

#### Frontend

```bash
cd frontend
yarn install
yarn dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 Available Scripts

### Backend

- `yarn start:dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn start:prod` - Start production server
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Run ESLint

### Frontend

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint

### API Integration

We use the package swagger-typescript-api to generate the Typescript types for the frontend, based on the NestJS backend. That can be run from the root of the frontend folder, with this command:

yarn generate-api-local

### Common Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 🎨 UI Components

The frontend uses **shadcn/ui** components built with:

- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **Lucide Icons** for consistent iconography

Add new components:

```bash
cd frontend
npx shadcn-ui@latest add button
```

This starter kit is designed to be cloned and customized for your specific project needs. Feel free to remove unused features, add new ones, or modify the structure to fit your requirements.
