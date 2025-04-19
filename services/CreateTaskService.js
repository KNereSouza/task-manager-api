import { v4 as uuid } from "uuid";
import Task from "../models/Task.js";
import { saveTask } from "../repositories/TaskRepository.js";

/**
 * Service responsible for creating and saving tasks to the database.
 */
export default class CreateTaskService {
  /**
   * Handles the creation of a new task.
   * @param {Object} taskData - The data for the new task.
   * @param {string} taskData.name - The name of the task.
   * @param {string} taskData.description - The description of the task.
   * @param {string} taskData.status - The status of the task (e.g., "pending", "completed").
   * @returns {Promise<Task>} The created task.
   * @throws {Error} If validation fails or the database operation fails.
   */
  async handle({ name, description, status }) {
    if (!name || !description || !status) {
      throw new Error("All fields are required.");
    }

    // Create a new task instance
    const task = new Task(uuid(), name, description, status);

    // Save the task to the database
    try {
      await saveTask(task); // Await the asynchronous operation
    } catch (error) {
      console.log("Error at saving task to database:", error);
      throw new Error("Failed to save task to the database.");
    }

    return task; // Return the created task
  }
}
