import GetTasksByStatusService from "../services/GetTaskByStatusService.js";

export default class GetTasksByStatusController {
  constructor(getTasksByStatusService = new GetTasksByStatusService()) {
    this.getTasksByStatusService = getTasksByStatusService;
  }

  async handle(request, response) {
    const status = request.params.status;
    console.log(status);

    // Define valid values to 'status' param
    const validStatus = ["pending", "in progress", "complete"];

    // Validation of 'status'
    if (typeof status !== "string" || !validStatus.includes(status)) {
      // Log the error for debugging
      console.error(
        `[at controllers layer] Invalid or missing 'status': ${status}`
      );

      // Return an error response
      return response.status(400).json({
        message: `The field 'status' is required and must be one of the following: ${validStatus.join(
          ", "
        )}.`,
      });
    }

    try {
      const data = await this.getTasksByStatusService.handle({
        taskStatus: status,
      });
      return response.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      // Log the error for debugging
      console.error(
        `[at controllers layer] Error querying tasks with status '${status}':`,
        error
      );
      return response.status(500).json({
        success: false,
        message:
          error.message ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
