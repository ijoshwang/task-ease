# Task Ease

**Visit**: https://task-ease-flow.vercel.app/

Task Ease makes managing your tasks effortless, helping you focus on what matters most without the stress.

This is a full-stack application designed to organize tasks efficiently. This repository contains the backend API built with ASP.NET Core, using MongoDB for data storage, as well as the frontend built with Next.js and Material-UI.

The application handles user authentication, task management, and provides a robust structure following best practices and design patterns.

## Features

### Completed

- **Authentication**: User login and JWT token generation implemented.
- **Todos CRUD**: Create, read, update, delete operations for todos completed.
- **Sort and Filter**: Sorting and filtering by due date, status, name.
- **Database Connection**: MongoDB connection properly configured and tested.
- **Authorization**: JWT-based authorization for API endpoints implemented.
- **API Documentation**: All API endpoints documented.
- **Responsive Design**: UI is responsive and works well on various devices.
- **README**: Detailed setup and usage instructions provided.
- **CI/CD**: Setup CI/CD pipeline for automated deployment.

### TODO List

- [ ] **Error Handling**: Implement error handling and validation.
- [ ] **User Registration**: Implement user registration endpoint.
- [ ] **Todo Priorities**: Add priority levels to todos.
- [ ] **Tags**: Add tagging functionality to todos.
- [ ] **Unit Tests**: Write unit tests for backend and frontend.

## Tech Stack

- **Frontend**: Next.js 14.0, TypeScript, Material-UI (MUI)
- **Backend**: ASP.NET Core 8.0, C#
- **Database**: MongoDB (MongoDB Atlas)

## Directory Structure

```plaintext
task-ease/
  ├── client/
  ├── api/
  ├── .gitignore
  ├── README.md
  └── task-ease.sln
```

## Setup and Usage

### Clone the repository

```
git clone https://github.com/ijoshwang/task-ease.git
cd task-ease
```

### Backend Setup

```
cd api
```

Create a `.env` file in the api directory and add the following:

```
MONGODB_CONNECTION_STRING=
MONGODB_DATABASE_NAME==
JWT_KEY=
JWT_ISSUER=
JWT_AUDIENCE=
```

```
dotnet restore
dotnet build
dotnet watch run
```

API documentation can be accessed at https://localhost:5008/swagger

### Frontend Setup

```
cd client
npm install
npm run dev
```

Visit the frontend at http://localhost:3000

## API Endpoints

#### POST /api/auth/login

- **Request Body**:
  ```json
  {
    "name": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string"
  }
  ```

#### GET /api/todos

- **Query Parameters**:

  - status (optional): Filter by status (all, 0, 1, 2)
  - sortBy (optional): Sort by field (status, dueDate, name)
  - sortOrder (optional): Sort order (asc, desc)

- **Response**:

  ```json
  [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "dueDate": "2024-06-15T00:00:00Z",
      "status": 0,
      "userId": "string",
      "createTime": "2024-04-20T10:20:30Z"
    }
  ]
  ```

#### GET /api/todos/{id}

- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "dueDate": "2024-06-15T00:00:00Z",
    "status": 0,
    "userId": "string",
    "createTime": "2024-04-20T10:20:30Z"
  }
  ```

#### POST /api/todos

- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "dueDate": "2024-06-15T00:00:00Z"
  }
  ```
- **Response**:

  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "dueDate": "2024-06-15T00:00:00Z",
    "status": 0,
    "userId": "string",
    "createTime": "2024-04-20T10:20:30Z"
  }
  ```

#### PUT /api/todos/{id}

- **Request Body**:
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "dueDate": "2024-06-15T00:00:00Z",
    "status": 1
  }
  ```
- **Response**:
  - 204 No Content

#### DELETE /api/todos/{id}

- **Response**:
  - 204 No Content
