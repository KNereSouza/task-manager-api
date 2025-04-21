import GetAllTasksService from "../services/GetAllTasksService.js";

export default class GetAllTasksController {
  async handle(request, response) {
    try {
      const getAllTasksService = new GetAllTasksService();
      const data = await getAllTasksService.handle();
      return response.status(200).json(data);
    } catch (error) {
      console.log(
        "[at Controller] Error in GetAllTasksController:",
        error.message
      );
      // Return an error response
      return response.status(500).json({
        message:
          error.message ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
