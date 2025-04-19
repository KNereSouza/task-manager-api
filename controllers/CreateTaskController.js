import CreateTaskService from "../services/CreateTaskService.js";

export default class CreateTaskController {
  /**
   * Handles the HTTP request to create a new task.
   * @param   { Object } request - The HTTP request object.
   * @param   { Object } response - The HTTP response object.
   * @returns { Promise<Object> } The HTTP response with the created task.
   */
  async handle(request, response) {
    // Extract task data from the request
    const { name, description, status } = request.body;

    // Basic validation in the controller
    if (!name || !description || !status) {
      return response.status(400).json({ message: "All fields are required." });
    }

    try {
      // Use the service to create the task
      const createTaskService = new CreateTaskService();
      const task = await createTaskService.handle({
        name,
        description,
        status,
      });

      // Return a sucess response
      return response.status(201).json({
        message: "Task created sucessfully!",
        task: task.toJSON(),
      });
    } catch (error) {
      // Log the error for debugging
      console.log("Error creating task:", error.message);

      // Determine the appropriate status code based on the error
      const statusCode =
        error.message === "All fields are required." ? 400 : 500;

      // Return an error response
      return response.status(statusCode).json({
        message:
          error.message ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
