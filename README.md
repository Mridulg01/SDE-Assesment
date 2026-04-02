# SDE Intern Assessment (Backend)

This is a Node.js-based REST API built using the [NestJS](https://nestjs.com/) framework, fulfilling all the requirements for the SDE Intern (Backend) assessment.

## Features Implemented
- **NestJS Framework:** Utilizing decorators and dependency injection.
- **PostgreSQL Database:** Controlled with a ready-to-use Docker Compose file.
- **TypeORM integration:** Manages the schema for `User` and `Task` entities.
- **Authentication & Authorization (JWT):** Registration, login with bcrypt password hashing, and JWT endpoints. Includes route guards so that Users can only perform CRUD operations on their own Tasks.
- **CRUD Operations for Tasks:** Create, Read, Update, and Delete endpoints for task management.
- **Input Validation:** Done securely using `class-validator` and `class-transformer` decorators.
- **Unit Testing:** Initialized Jest unit tests for verifying API functionality.
- **Git Version Control:** Follows clean repository standards.

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.x or later installed)
- [Docker](https://www.docker.com/) (to easily run the PostgreSQL container)
- [Git](https://git-scm.com/)

### 2. Run PostgreSQL using Docker
Start the PostgreSQL container securely in the background:
```bash
docker-compose up -d
```
> The `docker-compose.yml` is already configured with the correct username (`nestuser`), password (`nestpassword`), and database (`nestdb`).

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the API locally
```bash
# development watch mode
npm run start:dev
```
The application will listen on `http://localhost:3000`.

### 5. Running Unit Tests
Execute the unit test suites built with Jest:
```bash
npm run test
```

---

## Testing API Endpoints 

### Authentication
- `POST /auth/signup`
  - Body: `{ "username": "testuser", "password": "password123" }`
- `POST /auth/signin`
  - Body: Same as above. Returns `{ "accessToken": "eyJhb..." }`

### Tasks CRUD (Requires Bearer Token)
*Use the token obtained from `/auth/signin` in the Authorization header (`Authorization: Bearer <token>`)*
- `POST /tasks`: Create a task. Body: `{ "title": "Buy milk", "description": "1 Gallon" }`
- `GET /tasks`: Retrieve all tasks created by the authenticated user.
- `GET /tasks/:id`: Retrieve a specific task by its UUID.
- `PATCH /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.

---
## Submission / Uploading to your GitHub
This repository is already initialized with Git locally. To upload it to your GitHub profile so you can send it to the recruiter:

1. Create a new, completely empty repository on [GitHub](https://github.com/new).
2. Run the following commands inside this directory to link and push your code:
```bash
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```
