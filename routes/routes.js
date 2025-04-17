import { Router } from "express";

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

export default router;
