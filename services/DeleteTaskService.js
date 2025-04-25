import { deleteTask } from "../repositories/TaskRepository.js";

export default class DeleteTaskService {

    /**
   * Handles the deletion of a task by its ID
   * @param   { Object } params        - The parameters for the deletion
   * @param   { string } params.taskId - The ID of the task to delete
   * @returns { Promise<Object> }      - An object containing the success status, message, and deleted task ID
   * @throws  { Error }                - If the task deletion fails
   */
  async handle({ taskId }) {
    try {
      const data = await deleteTask(taskId);
      return {
        success: true,
        message: "Task deleted successfully",
        deletedTaskId: data,
      };
    } catch (error) {
      console.error(
        `[DeleteTaskService] Failed to delete task with id: ${taskId}`,
        error
      );
      throw new Error(
        `Failed to delete task with id: ${taskId}. Reason: ${error.message}`
      );
    }
  }
}
