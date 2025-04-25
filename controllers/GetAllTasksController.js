import GetAllTasksService from "../services/GetAllTasksService.js";

export default class GetAllTasksController {

  constructor(getAllTasksService = new GetAllTasksService()) {
    this.getAllTasksService = getAllTasksService;
  }

  /**
   * Handles the HTTP request to get all tasks on the Database
   * @param   { Object } request  - The HTTP request object
   * @param   { Object } response - The HTTP response object
   * @returns { Promise<Object> } - Returns a JSON response with all tasks
   */
  async handle(request, response) {
    try {
      // Use the service to get all tasks
      const data = await this.getAllTasksService.handle();

      // Return a success response with all tasks
      return response.status(200).json(data);
    } catch (error) {
      // Log the error for debugging
      console.error("[at controllers layer] Failed to query all tasks", error);

      // Return an error response
      return response.status(500).json({
        message:
          "An unexpected error occurred. Please try again later."
      });
    }
  }
}
