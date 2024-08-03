import axios from "axios";
import { rootUrl } from "../../constants/constants";

const permissionServices = {
  fetchPermissions: async () => {
    try {
      const response = await axios.post(`${rootUrl}auth/getPermissions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
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
      console.error("Error:", error);
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
      console.log("Error adding user:", error);
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
      console.log("Error adding user:", error);
    }
  },
};

export default permissionServices;
