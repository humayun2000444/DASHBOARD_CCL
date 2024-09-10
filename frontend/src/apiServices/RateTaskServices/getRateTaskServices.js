import axios from "axios";

const url = "http://192.168.0.110:5070/";

const getRateTaskServices = {
  fetchAllRateTask: async (payload) => {
    try {
      const response = await axios.post(url + "rate-task");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },

  createRateTask: async (payload) => {
    try {
      const response = await axios.post(url + "new-task",payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
};

export default getRateTaskServices;
