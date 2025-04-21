import { Router } from "express";

// Importing the Controller
import CreateTaskController from "../controllers/CreateTaskController.js";
import GetAllTasksController from "../controllers/GetAllTasksController.js";

// Create a new router instance
const router = Router();

// Example route handler
router.get("/hello", (req, res) => {
  res.send({
    message: "Hello, World!",
    PORT: process.env.PORT,
    env: "development",
  });
});

// Route to get all tasks
router.get("/tasks", async (request, response) => {
  const controller = new GetAllTasksController();
  await controller.handle(request, response);
});

// Route to create an task
router.post("/task", async (request, response) => {
  const controller = new CreateTaskController();
  await controller.handle(request, response);
});

export default router;
