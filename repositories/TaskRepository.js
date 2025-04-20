import { getDatabase } from "../config/database.js";

/**
 * Saves a task from the database
 * @param   { Task } task - the task to save
 * @returns { Promise<void> }
 * @throws  { Error } if the database operation fails
 */
async function saveTask(task) {
  try {
    const db = getDatabase();
    const tasksCollection = db.collection(process.env.DB_COLLECTION);
    await tasksCollection.insertOne(task.toJSON());
    console.log("Task saved to database:", task.toJSON());
  } catch (error) {
    console.error("Error saving task to database:", error);
    throw new Error("Failed to save task to the database.");
  }
}

/**
 * Retrieves all tasks from the database
 * @returns { Promise<Array<Object>> } - A promise that resolves to an array of task objects
 * @throws  { Error } if the database operation fails
 */
async function getAllTasks() {
  try {
    const db = getDatabase();
    const tasksCollection = db.collection(process.env.DB_COLLECTION);
    const data = await tasksCollection.find().toArray();
    return data;
  } catch (error) {
    console.error("Error at query all registers from the database.", error);
    throw new Error("Failed to query all tasks on the database.");
  }
}

async function deleteTask(id) {
  // Implementation for deleting a task from the database will be done in the future.
}

export { saveTask, getAllTasks, deleteTask };
