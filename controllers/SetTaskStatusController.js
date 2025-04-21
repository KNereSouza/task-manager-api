import SetTaskStatusService from "../services/SetTaskStatusService.js";

export default class SetTaskStatusController {
  async handle(request, response) {
    const { id, status } = request.body;

    // Define valid values to 'status' param
    const validStatus = ["pending", "in progress", "complete"];

    // Validate 'id'
    if (!id || typeof id !== "string") {
      console.error(
        `[at SetTaskStatusController] Invalid or missing 'id': ${id}`
      );
      return response.status(400).json({
        message: "BAD REQUEST: 'id' is required and must be a valid string.",
      });
    }

    // Validate 'status'
    if (!status || typeof id !== "string") {
      console.error(
        `[at SetTaskStatusController] Invalid or missing 'status': ${status}`
      );
      return response.status(400).json({
        message:
          "BAD REQUEST: 'status' is required and must be a valid string.",
      });
    }

    if (!validStatus.includes(status)) {
      console.error(
        `[at SetTaskStatusController] '${status}' is not a valid state for a task`
      );
      return response.status(400).json({
        message: `BAD REQUEST: '${status}' is not a valid state for a task. Valid states are: ${validStatus}`,
      });
    }

    try {
      const setTaskStatusService = new SetTaskStatusService();
      const data = await setTaskStatusService.handle({ id, status });
      return response.status(200).json(data);
    } catch (error) {
      console.error(
        `[at SetTaskStatusController] Error setting task status for ID '${id}' with status '${status}':`,
        error
      );

      const statusCode = error.message.includes("not found") ? 404 : 500;

      return response.status(statusCode).json({
        message:
          error.message ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
