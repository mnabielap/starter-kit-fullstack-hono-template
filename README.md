# Fullstack Hono + Bootstrap 5 Starter Kit

A complete and ready-to-use Fullstack starter kit, built with **Hono** on Cloudflare Workers (Pages). This project combines a robust REST API with a clean **Bootstrap 5 Dashboard UI**, integrated with Cloudflare D1, Zod, and OpenAPI.

## ✨ Key Features

-   **Fullstack Architecture:** Hybrid setup serving both **REST API** (JSON) and **Server-Side Rendered Views** (JSX/HTML).
-   **Modern Framework:** Built with [Hono](https://hono.dev/), a very fast and lightweight web framework for edge platforms.
-   **Bootstrap 5 UI:** Integrated with a responsive Admin Dashboard template using Hono JSX and Bootstrap 5 (CDN).
-   **Cloudflare Platform:** Optimized to run on Cloudflare Pages, with [D1](https://developers.cloudflare.com/d1/) database (SQLite-based).
-   **Validation & Schema:** Uses [Zod](https://zod.dev/) for request validation.
-   **Automated API Documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/) documentation is generated automatically via `@hono/zod-openapi`.
-   **Authentication:** Secure JWT-based authentication system (Access & Refresh Token) with role-based access control.
-   **Docker Ready:** Docker configuration included for running a consistent production environment.

## Prerequisites

Before starting, ensure you have installed the following software:
-   [Node.js](https://nodejs.org/) (version 22 or newer)
-   [npm](https://www.npmjs.com/) (usually installed with Node.js)
-   [Docker](https://www.docker.com/products/docker-desktop/) (only if you want to run via Docker)

---

## 🚀 Getting Started

There are two ways to run this project: locally for development or using Docker.

### Method 1: Local Development (Without Docker)

**1. Clone Repository**
```bash
git clone https://github.com/mnabielap/starter-kit-fullstack-hono-template.git
cd starter-kit-fullstack-hono-template
```

**2. Install Dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
Create a `.dev.vars` file in the project root (based on `wrangler.jsonc` variables).
```
# .dev.vars
JWT_SECRET="long_secure_secret_for_dev"
JWT_ACCESS_EXPIRATION_MINUTES="30"
JWT_REFRESH_EXPIRATION_DAYS="30"
JWT_RESET_PASSWORD_EXPIRATION_MINUTES="10"
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES="10"
```

**4. Setup & Seed Local D1 Database**
```bash
# Create tables
npm run db:schema

# Populate initial data (Admin User)
npm run db:seed
```

**5. Run Development Server**
```bash
npm run dev
```
The server is now running at `http://localhost:5173`.

---

### Method 2: Running with Docker

This method wraps the application and its database in a container.

**1. Create Environment File for Docker**
Create a file named `.env.docker` in the project root.
```
# .env.docker
JWT_SECRET="secure_secret_for_docker"
JWT_ACCESS_EXPIRATION_MINUTES="30"
JWT_REFRESH_EXPIRATION_DAYS="30"
JWT_RESET_PASSWORD_EXPIRATION_MINUTES="10"
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES="10"
```

**2. Create Docker Network & Volumes**
Ensure specific names are used for this fullstack project.
```bash
# Create network
docker network create fullstack_hono_network

# Create volume for D1 database
docker volume create fullstack_hono_db_volume

# Create volume for media files (if any)
docker volume create fullstack_hono_media_volume
```

**3. Build Docker Image**
```bash
docker build -t fullstack-hono-app .
```

**4. Run Docker Container**
```bash
docker run -d -p 5005:5005 \
  --env-file .env.docker \
  -v fullstack_hono_db_volume:/app/.wrangler/d1 \
  -v fullstack_hono_media_volume:/app/media \
  --network fullstack_hono_network \
  --name fullstack-hono-container \
  fullstack-hono-app
```
The server is now running at `http://localhost:5005`.

---

## 📖 API Documentation (Swagger)

You can access interactive API documentation via Swagger UI.

-   Local: `http://localhost:5173/ui`
-   Docker: `http://localhost:5005/ui`

---

## 🐳 Docker Container Management

Here are some basic commands to manage your containers.

#### View logs
```bash
docker logs -f fullstack-hono-container
```

#### Stop the container
```bash
docker stop fullstack-hono-container
```

#### Restart the container
```bash
docker start fullstack-hono-container
```

#### Remove the container
```bash
docker rm fullstack-hono-container
```

#### Remove Volumes (WARNING: Deletes Data)
```bash
docker volume rm fullstack_hono_db_volume
docker volume rm fullstack_hono_media_volume
```

---

## 📜 Available NPM Scripts

-   `npm run dev`: Runs the development server (Vite).
-   `npm run build`: Builds the application for production (Cloudflare Pages).
-   `npm run deploy`: Builds and deploys the application to Cloudflare Pages.
-   `npm run cf-typegen`: Generates TypeScript types from `wrangler.jsonc`.
-   `npm run db:schema`: Runs `src/db/schema.sql` on **Local** D1.
-   `npm run db:seed`: Runs `src/db/seed.sql` on **Local** D1.
-   `npm run db:remote:schema`: Runs `src/db/schema.sql` on **Remote** Cloudflare D1.
-   `npm run db:remote:seed`: Runs `src/db/seed.sql` on **Remote** Cloudflare D1.

---

## 🏗️ Project Structure

```
/
├── public/             # Static assets (JS, _routes.json)
├── src/
│   ├── config/         # App configuration
│   ├── controllers/    # Logic handlers
│   │   ├── api/        # JSON API Controllers (e.g. auth.controller.ts)
│   │   └── web/        # HTML/JSX Controllers (e.g. home.controller.tsx)
│   ├── db/             # SQL Schema & Seeds
│   ├── middlewares/    # Hono Middlewares
│   ├── repositories/   # Database operations
│   ├── routes/         # Route definitions
│   │   ├── api/        # API Routes (/v1/...)
│   │   └── web/        # Web Routes (Rendered Views)
│   ├── schemas/        # Zod Schemas
│   ├── services/       # Business logic
│   ├── utils/          # Utilities
│   ├── views/          # JSX/TSX Views (Bootstrap Templates)
│   └── index.ts        # Main Entry Point
├── package.json
└── wrangler.jsonc      # Cloudflare Configuration
```