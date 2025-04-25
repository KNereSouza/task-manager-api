import SetTaskStatusService from "../services/SetTaskStatusService.js";

export default class SetTaskStatusController {

  constructor(setTaskStatusService = new SetTaskStatusService()) {
    this.setTaskStatusService = setTaskStatusService;
  }

  /**
   * Handles the HTTP request to set the status of a task
   * @param   { Object } request  - The HTTP request object
   * @param   { Object } response - The HTTP response object
   * @returns { Promise<Object> } - Returns a JSON response with the result of the operation
   */
  async handle(request, response) {
    // Extract the task id and new status from the body
    const { id, status } = request.body;

    // Define valid values to 'status' param
    const validStatus = ["pending", "in progress", "complete"];

    // Validation of 'id'
    if (!id || typeof id !== "string") {
      // Log the error for debugging
      console.error(`[at controllers layer] Invalid or missing 'id': ${id}`);

      // Return an error response
      return response.status(400).json({
        message: "The field 'id' is required and must be a valid string.",
      });
    }

    // Validation of 'status'
    if (!status || typeof status !== "string") {
      // Log the error for debugging
      console.error(`[at controllers layer] Invalid or missing 'status': ${status}`);

      // Return an error response
      return response.status(400).json({
        message:
          "the field 'status' is required and must be a valid string.",
      });
    }

    // Check if the provided status is one of the valid statuses
    if (!validStatus.includes(status)) {
      // Log the error for debugging
      console.error(
        `[at controllers layer] '${status}' is not a valid state for a task`
      );

      // Return an error response
      return response.status(400).json({
        message: `The value '${status}' is not a valid state for a task. Valid states are: ${validStatus}`,
      });
    }

    try {
      // Use the service to set the task status
      const data = await this.setTaskStatusService.handle({ id, status });

      // Return a success response
      return response.status(200).json(data);
    } catch (error) {
      // Log the error for debugging
      console.error(
        `[at controllers layer] Error setting task status for ID '${id}' with status '${status}':`,
        error
      );

      // Set the appropriate status code for this case
      const statusCode = error.message.includes("not found") ? 404 : 500;

      // Return an error response
      return response.status(statusCode).json({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
