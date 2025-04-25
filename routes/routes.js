import { Router } from "express";

// Importing the Controller
import CreateTaskController from "../controllers/CreateTaskController.js";
import GetAllTasksController from "../controllers/GetAllTasksController.js";
import DeleteTaskController from "../controllers/DeleteTaskController.js";
import SetTaskStatusController from "../controllers/SetTaskStatusController.js";

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

// Route to delete an task
router.delete("/task", async (request, response) => {
  const controller = new DeleteTaskController();
  await controller.handle(request, response);
});

// Route to set an status for a task
router.patch("/task", async (request, response) => {
  const controller = new SetTaskStatusController();
  await controller.handle(request, response);
});

export default router;
