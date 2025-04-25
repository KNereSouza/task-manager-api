import { getDatabase } from "../config/database.js";

const db = getDatabase();
const tasksCollection = db.collection(process.env.DB_COLLECTION);

/**
 * @typedef  {Object} Task
 * @property {string} id     - The unique identifier of the task
 * @property {string} title  - The title of the task
 * @property {string} status - The status of the task (e.g., "pending", "in progress", "complete")
 */

/**
 * Saves a task to the database
 * @param   { Task } task     - The task to save
 * @returns { Promise<void> } - Resolves when the task is successfully saved
 * @throws  { Error }         - If the database operation fails
 */
async function saveTask(task) {
  try {
    // Save the task on the Database
    await tasksCollection.insertOne(task.toJSON());
    console.log("Task saved to database:", task.toJSON());
  } catch (error) {
    console.error("[at repositories layer] Error saving task to database:", error);
    throw new Error("Failed to save task to the database.");
  }
}

/**
 * Retrieves all tasks from the database
 * @returns { Promise<Array<Object>> } - A promise that resolves to an array of task objects
 * @throws  { Error }                  - If the database operation fails
 */
async function getAllTasks() {
  try {
    // Fetch all tasks from the database and convert them to an array
    const data = await tasksCollection.find().toArray();
    return data;
  } catch (error) {
    console.error(
      "[at repositories layer] Error at query all registers from the database.",
      error
    );
    throw new Error("Failed to query all tasks on the database.");
  }
}

/**
 * Deletes a task from the database by its ID
 * @param   { string } taskId   - The ID of the task to delete
 * @returns { Promise<Object> } - An object containing the ID of the deleted task
 * @throws  { Error }           - If the task is not found or the database operation fails
 */
async function deleteTask(taskId) {
  try {
    // Deleting a task in the database that has the given ID
    const query = { id: taskId };
    const result = await tasksCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      // Log a success message if task was deleted
      console.log(
        `Successfully deleted the task document with the id: ${taskId}`
      );
      return { id: taskId };
    } else {
      // Log a message indicating no task was found with the given ID
      console.log(`No task document found with the id: ${taskId}`);
      throw new Error(`Task with id ${taskId} not found.`);
    }
  } catch (error) {
    console.error(
      `[at repositories layer] Failed to delete task with id: ${taskId}`,
      error
    );
    throw new Error(`Failed to delete task with id: ${taskId}.`);
  }
}

/**
 * Updates the status of a task in the database
 * @param   { string } id       - The ID of the task to update
 * @param   { string } status   - The new status to set for the task
 * @returns { Promise<Object> } - An object containing the updated task ID and status, or a message if unchanged
 * @throws  { Error }           - If the task is not found or the database operation fails
 */
async function setTaskStatus(id, status) {
  try {
    const filter = { id: id };
    const updateDoc = {
      $set: {
        status: status,
      },
    };
    
    // Update the status of a task
    const result = await tasksCollection.updateOne(filter, updateDoc);

    // If the task with the given id is not found
    if (result.matchedCount === 0) {
      console.error(`[at TaskRepository] Task with id '${id}' not found.`);
      throw new Error(`Task with id '${id}' not found.`);
    }

    if (result.modifiedCount === 1) {
      // If the task was modified successfully
      console.log(
        `[at repositories layer] Successfully updated task status for id: ${id}`
      );
      return { id, status };
    } else {
      // If the new status is the same as the current status
      console.warn(
        `[at repositories layer] Task status for id '${id}' was not modified.`
      );
      return {
        id,
        status: "unchanged",
        message:
          "Task status was not modified because the new status is the same as the current status.",
      };
    }
  } catch (error) {
    console.error(
      `[at repositories layer] Error setting task status for ID '${id}' with status '${status}'`,
      error
    );
    throw new Error(
      `Failed to update task status with id: ${id}.`
    );
  }
}

export { saveTask, getAllTasks, deleteTask, setTaskStatus };
