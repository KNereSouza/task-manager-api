import { getTasksByStatus } from "../repositories/TaskRepository.js";

export default class GetTasksByStatusService {
  async handle({ taskStatus }) {
    try {
      const data = await getTasksByStatus(taskStatus);
      return data;
    } catch (error) {
      console.error(
        `[at services layer] Failed to retrieve tasks by status '${taskStatus}':`,
        error
      );
      throw error;
    }
  }
}
