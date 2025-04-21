import { setTaskStatus } from "../repositories/TaskRepository.js";

export default class SetTaskStatusService {
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
