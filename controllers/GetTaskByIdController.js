import GetTaskByIdService from "../services/GetTaskByIdService.js";

export default class GetTaskByIdController {
  constructor(getTaskByIdService = new GetTaskByIdService()) {
    this.getTaskByIdService = getTaskByIdService;
  }

  async handle(request, response) {
    const id = request.query.id;

    if (!id || typeof id !== "string") {
      // Log the error for debugging
      console.error(`[at controllers layer] Invalid or missing 'id': ${id}`);

      // Return an error response
      return response.status(400).json({
        message: "The field 'id' is required and must be a valid string.",
      });
    }

    try {
      const task = await this.getTaskByIdService.handle({ taskId: id });

      return response.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error(
        `[at controllers layer] Failed to retrieve task with id: ${id}`,
        error
      );

      const statusCode = error.message.includes("not found") ? 404 : 500;
      return response.status(statusCode).json({
        success: false,
        message:
          error.message ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
