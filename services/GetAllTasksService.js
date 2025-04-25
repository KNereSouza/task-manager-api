import { getAllTasks } from "../repositories/TaskRepository.js";

export default class GetAllTasksService {

  /**
   * Retrieves all tasks from the database
   * @returns { Promise<Array<Object>> } - A promise that resolves to an array of task objects
   * @throws  { Error }                  - If the retrieval of tasks fails
   */
  async handle() {
    try {
      const data = await getAllTasks();
      return data;
    } catch (error) {
      console.error("[at Service] Error in GetAllTasksService:", error);
      throw new Error("Failed to retrieve tasks.");
    }
  }
}
