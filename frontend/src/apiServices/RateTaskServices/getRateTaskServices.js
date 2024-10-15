import axios from "axios";

const url = "http://192.168.0.110:5070/";

const getRateTaskServices = {
  fetchAllRateTask: async (payload) => {
    try {
      const response = await axios.post(url + "rate-task");
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching All task", errorEx);

      throw errorEx;
    }
  },

  createRateTask: async (payload) => {
    try {
      const response = await axios.post(url + "new-task", payload);
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching crate rate task", errorEx);

      throw errorEx;
    }
  },
};

export default getRateTaskServices;
