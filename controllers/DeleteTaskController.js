import DeleteTaskService from "../services/DeleteTaskService.js";

export default class DeleteTaskController {
  async handle(request, response) {
    const taskId = request.body.id;

    if (!taskId || typeof taskId !== "string" || taskId.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Invalid taskId provided",
      });
    }

    try {
      const deleteTaskService = new DeleteTaskService();
      const data = await deleteTaskService.handle({ taskId });
      return response.status(200).json(data);
    } catch (error) {
      console.error(
        `[at Controller] Failed to delete task with id: ${taskId}`,
        error
      );
      return response.status(500).json({
        success: false,
        message: `Failed to delete task with id: ${taskId}. Reason: ${error.message}`,
      });
    }
  }
}
