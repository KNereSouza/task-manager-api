import { deleteTask } from "../repositories/TaskRepository.js";

export default class DeleteTaskService {
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
