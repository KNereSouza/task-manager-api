import CreateTaskService from "../services/CreateTaskService.js";

export default class CreateTaskController {
  async handle(request, response) {
    // Call the service to create a new task
    const createTaskService = new CreateTaskService();
    const task = await createTaskService.handle(request, response);

    // Return a success response
    return response.status(201).json({
      message: "Task created successfully",
      task: task.toJSON(),
    });
  }
}
