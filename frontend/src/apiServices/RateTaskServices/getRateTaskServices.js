import axios from "axios";

const url = "http://192.168.0.205:5070/";

const getRateTaskServices = {
  fetchAllRateTask: async (payload) => {
    try {
      const response = await axios.post(url + "ratetask");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
};

export default getRateTaskServices;
