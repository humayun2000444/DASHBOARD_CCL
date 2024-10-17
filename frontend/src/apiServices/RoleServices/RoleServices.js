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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching roles:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching role by ID:", errorEx);

      throw errorEx;
    }
  },

  createRole: async (data) => {
    try {
      const response = await axios.post(`${rootUrl}auth/createRole`, data, {});
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching create role:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching deleting role:", errorEx);

      throw errorEx;
    }
  },
};

export default roleServices;
