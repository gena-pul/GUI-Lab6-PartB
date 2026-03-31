import { emitter } from "./event-emitter.js";

const API_BASE = "http://localhost:4000/api";

export const DataService = {
  async fetchCount() {
    try {
      const response = await fetch(`${API_BASE}/increment`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      emitter.emit("count:changed", data.value);

    } catch (error) {
      console.error(error);
    }
  },
};