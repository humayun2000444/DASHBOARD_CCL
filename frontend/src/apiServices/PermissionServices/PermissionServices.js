import axios from "axios";
import config from "../../configs/config.json";

const {root } = config;

const rootUrl = `${root}8001/AUTHENTICATION/`


const permissionServices = {
  fetchPermissions: async () => {
    try {
      const response = await axios.post(`${rootUrl}auth/getPermissions`);
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching permission:", errorEx);

      throw errorEx;
    }
  },

  fetchPermissionById: async (id, token) => {
    try {
      const response = await axios.post(`${rootUrl}auth/getPermission/${id}`, {
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

      console.error("Error fetching permission by ID:", errorEx);

      throw errorEx;
    }
  },

  createPermission: async (data, token) => {
    try {
      const response = await axios.post(
        `${rootUrl}auth/createPermission`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching create permission:", errorEx);

      throw errorEx;
    }
  },
  deletePermission: async (id, token) => {
    try {
      const response = await axios.post(
        `${rootUrl}auth/deletePermission/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching deleting permission:", errorEx);

      throw errorEx;
    }
  },
};

export default permissionServices;
