import { getTaskByID } from "../repositories/TaskRepository.js";

export default class GetTaskByIdService {
  /**
   * Handles retrieving a task by its ID
   * @param   { Object } params        - The parameters for the retrieval
   * @param   { string } params.taskId - The ID of the task to retrieve
   * @returns { Promise<Object> }      - The task object if found
   * @throws  { Error }                - If the task retrieval fails
   */
  async handle({ taskId }) {
    try {
      return await getTaskByID(taskId);
    } catch (error) {
      console.error(
        `[at services layer] Failed to retrieve task with id: ${taskId}`,
        error
      );
      throw error;
    }
  }
}
