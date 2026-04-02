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

## ⚡ Interactive API Testing (Swagger UI) 
The easiest way to test this API without using Postman is via the built-in Swagger documentation interface.

1. Once the server is running, navigate your browser to: **http://localhost:3000/api**
2. Create a test user via `POST /auth/signup`.
3. Login via `POST /auth/signin` and copy your JWT `accessToken`.
4. Click the **"Authorize"** button at the top of the Swagger page, paste your token, and easily test all of the secure Task CRUD endpoints with the click of a button!

*(Alternatively, you can test endpoints manually using tools like Postman or cURL.)*

---

## 🔐 Security & Environment Variables
For evaluation convenience, the database and JWT credentials have fallback defaults hardcoded into the API matching the attached `docker-compose.yml` file. This means the project will run instantly out of the box without setup! 

However, the architecture intelligently uses `@nestjs/config`, meaning you can securely override any credential by simply placing a `.env` file in the root directory.

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
