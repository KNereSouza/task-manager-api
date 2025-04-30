import CreateTaskService from "../services/CreateTaskService.js";

export default class CreateTaskController {
  constructor(createTaskService = new CreateTaskService()) {
    this.createTaskService = createTaskService;
  }

  /**
   * Handles the HTTP request to create a new task.
   * @param   { Object } request  - The HTTP request object.
   * @param   { Object } response - The HTTP response object.
   * @returns { Promise<Object> } - Returns a JSON response with the created task.
   */
  async handle(request, response) {
    // Extract task data from the request
    const { name, description } = request.body;

    // Basic validation in the controller
    if (!name || !description) {
      return response.status(400).json({
        message: "All fields are required.",
      });
    }

    try {
      // Use the service to create the task
      const task = await this.createTaskService.handle({
        name,
        description,
        status: "pending",
      });

      // Return a sucess response
      return response.status(201).json({
        message: "Task created sucessfully!",
        task: task.toJSON(),
      });
    } catch (error) {
      // Log the error for debugging
      console.error("[at controllers layer] Failed to create a task", error);

      // Return an error response
      return response.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
