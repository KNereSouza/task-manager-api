import { getDatabase } from "../config/database.js";

const db = getDatabase();
const tasksCollection = db.collection(process.env.DB_COLLECTION);

/**
 * Saves a task from the database
 * @param   { Task } task - the task to save
 * @returns { Promise<void> }
 * @throws  { Error } if the database operation fails
 */
async function saveTask(task) {
  try {
    await tasksCollection.insertOne(task.toJSON());
    console.log("Task saved to database:", task.toJSON());
  } catch (error) {
    console.error("[at TaskRepository] Error saving task to database:", error);
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
    const data = await tasksCollection.find().toArray();
    return data;
  } catch (error) {
    console.error(
      "[at TaskRepository] Error at query all registers from the database.",
      error
    );
    throw new Error("Failed to query all tasks on the database.");
  }
}

async function deleteTask(taskId) {
  try {
    const query = { id: taskId };
    const result = await tasksCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log(
        `Sucessfully deleted the task document with the id: ${taskId}`
      );
      return { id: taskId };
    } else {
      console.log(`No task document found with the id: ${taskId}`);
      throw new Error(`Task with id ${taskId} not found.`);
    }
  } catch (error) {
    console.error(
      `[at TaskRepository] Failed to delete task with id: ${taskId}`,
      error
    );
    throw new Error(`Failed to delete task with id: ${taskId}.`);
  }
}

async function setTaskStatus(id, status) {
  try {
    const filter = { id: id };
    const updateDoc = {
      $set: {
        status: status,
      },
    };

    const result = await tasksCollection.updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      console.error(`[at TaskRepository] Task with id '${id}' not found.`);
      throw new Error(`Task with id '${id}' not found.`);
    }

    if (result.modifiedCount === 1) {
      console.log(
        `[at TaskRepository] Successfully updated task status for id: ${id}`
      );
      return { id, status };
    } else {
      console.warn(
        `[at TaskRepository] Task status for id '${id}' was not modified.`
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
      `[at TaskRepository] Error setting task status for ID '${id}' with status '${status}`,
      error
    );
    throw new Error(
      `INTERNAL SERVER ERROR: Failed to update task status with id: ${id}.`
    );
  }
}

export { saveTask, getAllTasks, deleteTask, setTaskStatus };
