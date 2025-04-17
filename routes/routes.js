import { Router } from "express";

// Importing the Controller
import CreateTaskController from "../controllers/CreateTaskController.js";

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

// Route to create an task
router.post("/task", async (req, res) => {
  const controller = new CreateTaskController();
  await controller.handle(req, res);
});

export default router;
