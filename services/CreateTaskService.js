import { v7 as uuid } from "uuid";
import Task from "../models/Task.js";
import { getDatabase } from "../config/database.js";

export default class CreateTaskService {
  async handle(request, response) {
    const { name, description, status } = request.body;

    if (!name || !description || !status) {
      return response.status(400).json({
        message: "All fiels are required.",
      });
    }

    // Create a new task instance
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

    return task;
  }
}
