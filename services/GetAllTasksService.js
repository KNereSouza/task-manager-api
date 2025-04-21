import { getAllTasks } from "../repositories/TaskRepository.js";

export default class GetAllTasksService {
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
