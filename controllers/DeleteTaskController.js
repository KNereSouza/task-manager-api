import DeleteTaskService from "../services/DeleteTaskService.js";

export default class DeleteTaskController {

  constructor(deleteTaskService = new DeleteTaskService()) {
       this.deleteTaskService = deleteTaskService;
  }

  /**
   * Handles the HTTP request to delete a task
   * @param   { Object } request  - the HTTP request object
   * @param   { Object } response - the HTTP response object
   * @returns { Promise<Object> } - Returns a JSON response with the result of the operation
   */
  async handle(request, response) {
    // Extract taskId from the request body
    const taskId = request.body.id;

    // Basic validation in the controller
    if (!taskId || typeof taskId !== "string" || taskId.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Invalid taskId provided",
      });
    }

    try {
      // Use the service to delete the task
      const data = await this.deleteTaskService.handle({ taskId })

      // Return a success response
      return response.status(200).json(data);
    } catch (error) {

      // Log the error for debugging
      console.error(
        `[at Controller] Failed to delete task with id: ${taskId}`,
        error
      );

      // Return an error response
      return response.status(500).json({
        success: false,
        message: "An unexpected error occurred while deleting the task.",
      });
    }
  }
}
