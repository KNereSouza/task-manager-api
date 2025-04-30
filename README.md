# Task Manager API

A lightweight and modern RESTful API for managing tasks, built with Node.js, Express, and MongoDB.

## Features

- **Task Management**: Create, retrieve, update, and delete tasks.
- **Status Filtering**: Retrieve tasks based on their status (e.g., "pending", "in progress", "complete").
- **Robust Error Handling**: Comprehensive error handling across all layers (controller, service, repository).
- **Scalable Architecture**: Clean separation of concerns using controllers, services, and repositories.
- **Environment Configuration**: Easily configurable using `.env` files.
- **UUID Integration**: Unique task identifiers generated using `uuid`.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KNereSouza/task-manager-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the `.env` file:
   Create a `.env` file in the root directory and add the required environment variables. For example:
   ```env
   PORT=3333
   DB_URL=<your_mongodb_connection_string>
   DB_NAME=<your_database_name>
   DB_COLLECTION=<your_collection_name>
   ```

---

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Access the API at:
   ```
   http://localhost:<PORT>/api
   ```

---

## API Endpoints

### Task Management

| Method | Endpoint             | Description                    | Request Body                                                                      |
| ------ | -------------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| GET    | `/api/tasks`         | Retrieve all tasks             | N/A                                                                               |
| GET    | `/api/task`          | Retrieve a task by its ID      | Query: `id=<task_id>`                                                             |
| GET    | `/api/tasks/:status` | Retrieve tasks by their status | Path Parameter: `status` (e.g., "pending", "in progress", "complete")             |
| POST   | `/api/task`          | Create a new task              | `{ "name": "Task Name", "description": "Task Description", "status": "pending" }` |
| PATCH  | `/api/task`          | Update the status of a task    | `{ "id": "<task_id>", "status": "<new_status>" }`                                 |
| DELETE | `/api/task`          | Delete a task by its ID        | `{ "id": "<task_id>" }`                                                           |

---

## Environment Variables

The following environment variables are required to run the application:

| Variable        | Description                                  |
| --------------- | -------------------------------------------- |
| `PORT`          | The port on which the server will run        |
| `DB_URL`        | The MongoDB connection string                |
| `DB_NAME`       | The name of the MongoDB database             |
| `DB_COLLECTION` | The name of the MongoDB collection for tasks |

---

## Project Structure

```
task-manager-api/
├── controllers/         # Handles HTTP requests and responses
│   ├── CreateTaskController.js
│   ├── DeleteTaskController.js
│   ├── GetAllTasksController.js
│   ├── GetTaskByIdController.js
│   ├── GetTasksByStatusController.js
│   └── SetTaskStatusController.js
├── services/            # Business logic layer
│   ├── CreateTaskService.js
│   ├── DeleteTaskService.js
│   ├── GetAllTasksService.js
│   ├── GetTaskByIdService.js
│   ├── GetTaskByStatusService.js
│   └── SetTaskStatusService.js
├── repositories/        # Database interaction layer
│   └── TaskRepository.js
├── models/              # Data models
│   └── Task.js
├── config/              # Configuration files
│   └── database.js
├── routes/              # API route definitions
│   └── routes.js
├── .env                 # Environment variables
├── .gitignore           # Files to ignore in Git
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
└── index.js             # Entry point of the application
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

Developed by **KNereSouza**.
