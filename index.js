import express from "express";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send({
    message: "Hello, World!",
    port: PORT,
    env: "development",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
