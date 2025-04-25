import { setTaskStatus } from "../repositories/TaskRepository.js";

export default class SetTaskStatusService {
  /**
   * Updates the status of a task in the database
   * @param   { Object } params         - The parameters for updating the task status
   * @param   { string } params.id      - The ID of the task to update
   * @param   { string } params.status  - The new status to set for the task
   * @returns { Promise<Object> }       - An object containing the updated task ID and status
   * @throws  { Error }                 - If the task status update fails
   */
  async handle({ id, status }) {
    try {
      const data = await setTaskStatus(id, status);
      return data;
    } catch (error) {
      console.error(
        `[at SetTaskStatusService] Error setting task status for ID '${id}' with status '${status}':`,
        error
      );
      throw new Error(
        `Failed to set task status for ID '${id}' with status '${status}': ${
          error.message || "Unknown error"
        }`
      );
    }
  }
}
