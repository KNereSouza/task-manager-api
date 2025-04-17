import { getDatabase } from "../config/database.js";
import Task from "../models/Task.js";
import { v7 as uuid } from "uuid";

export default class CreateTaskController {
  async handle(request, response) {
    // Extract the task details from the request body
    const { name, description, status } = request.body;

    // Validate the request body
    if (!name || !description || !status) {
      return response.status(400).json({
        message: "All fields are required",
      });
    }

    // Create a new task
    const task = new Task(uuid(), name, description, status);

    // Save the task to the database
    try {
      const db = getDatabase();
      const tasksCollection = db.collection(process.env.DB_COLLECTION);
      await tasksCollection.insertOne(task.toJSON());
      console.log("Task saved to database:", task.toJSON());
    } catch (error) {
      console.error("Error saving task to database:", error);
      return response.status(500).json({
        message: "Internal server error",
      });
    }

    // Return a success response
    return response.status(201).json({
      message: "Task created successfully",
      task: task.toJSON(),
    });
  }
}
