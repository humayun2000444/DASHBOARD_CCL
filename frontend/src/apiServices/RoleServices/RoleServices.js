import axios from "axios";
import config from "../../configs/config.json";

const { root } = config;

const rootUrl = `${root}8001/AUTHENTICATION/`;

const roleServices = {
  fetchRoles: async () => {
    try {
      const response = await axios.post(`${rootUrl}auth/getRoles`);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  fetchRoleById: async (id, token) => {
    try {
      const response = await axios.post(`${rootUrl}auth/getRole/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  },

  createRole: async (data) => {
    try {
      const response = await axios.post(`${rootUrl}auth/createRole`, data, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding user:", error);
    }
  },
  deleteRole: async (id, token) => {
    try {
      const response = await axios.post(`${rootUrl}auth/deleteRole/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding user:", error);
    }
  },
};

export default roleServices;
