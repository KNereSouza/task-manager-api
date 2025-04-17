import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/routes.js";

// Load environment variables from .env file
configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure routes
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
