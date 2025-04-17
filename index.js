// Dependencies
import express from "express";
import { configDotenv } from "dotenv";

// Importing the router
import router from "./routes/routes.js";

// Importing the database connection
import { connectToDatabase } from "./config/database.js";

// Load environment variables from .env file
configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure routes
app.use("/api", router);

// Connect to the database
connectToDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
