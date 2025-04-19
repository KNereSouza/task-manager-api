/**
 * Represents a Task with an ID, name, description, and status.
 */

export default class Task {
  /**
   * Creates an instance of Task.
   * @param { number|string } id - The unique identifier for the task.
   * @param { string } name - The name of the task.
   * @param { string } description - A detailed description of the task.
   * @param { string } status - The current status of the task (e.g., "pending", "completed").
   */
  constructor(id, name, description, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }

  /**
   * Creates a Task instance from a JSON object.
   * @param   { Object } json - The JSON object containing task data.
   * @param   { number|string } json.id - The unique identifier for the task.
   * @param   { string } json.name - The name of the task.
   * @param   { string } json.description - A detailed description of the task.
   * @param   { string } json.status - The current status of the task.
   * @returns { Task } A new Task instance.
   */
  static createFromJSON(json) {
    return new Task(json.id, json.name, json.description, json.status);
  }

  /**
   * Converts the Task instance to a JSON object.
   * @returns { Object } A JSON representation of the Task.
   * @returns { number|string } return.id - The unique identifier for the task.
   * @returns { string } return.name - The name of the task.
   * @returns { string } return.description - A detailed description of the task.
   * @returns { string } return.status - The current status of the task.
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
    };
  }
}
