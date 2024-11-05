# Frontend Project

This project is a monorepo containing a React dashboard, an Angular admin application, and a Node.js API. The dashboard application fetches economic data from the FRED API, while the admin application manages users.

1. **Dashboard** (apps/dashboard): A React-based dashboard application for viewing economic data from the FRED API
2. **Admin** (apps/admin): An Angular-based admin application that manages users
3. **API** (apis/fred-proxy): A proxy API that connects to the FRED API (due to CORS restrictions)
4. **JSON Server** (apis/db.json): A development-only JSON server

## Technologies Used

- **Nx**: Monorepo management
- **Dashboard**: React, Vite, Zustand, shadcn UI
- **Admin**: Angular, Signal, Zoneless CD, NgRx Signal Store
- **API**: Node.js
- **JSON Server**: JSON Server

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Docker](https://www.docker.com/) (for running the project in a container)

## Getting Started

1. Clone the repository:

```

git clone https://github.com/chihab/frontend-project.git

```

2. Navigate to the project directory:

```

cd frontend-project

```

3. Install dependencies:

```

pnpm install

```

## Running the Project

### Development

1. Start the development servers:

```

pnpm dev

```

This will start the React Dashboard, Angular Admin, and API servers.

2. Access the applications:

- Admin: `http://localhost:4200`
- Dashboard: `http://localhost:4201`

### Production

1. Build and start the Docker image:

```
docker-compose up --build

```

2. Access the applications:

- Dashboard: `http://localhost:8081`
- Admin: `http://localhost:8082`
- API: `http://localhost:3001` (acts as a proxy to the FRED API)
- JSON Server: `http://localhost:3000`

## Other Commands

- **Linting**: `pnpm lint`
- **Unit Tests**: `pnpm test`

Enjoy exploring the project!

```

```
