import axios from "axios";
import { rootUrl } from "../../constants/constants";

const userServices = {
  fetchAllUsers: async (token) => {
    try {
      const response = await axios.post(
        `${rootUrl}getUsers`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  fetchUserById: async (id, token) => {
    try {
      const response = await axios.post(
        `${rootUrl}getUser/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  createUser: async (userData, token) => {
    try {
      const response = await axios.post(`${rootUrl}auth/createUser`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  updateUser: async (id, userData, token) => {
    try {
      const response = await axios.post(`${rootUrl}editUser/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (id, token) => {
    try {
      await axios.post(
        `${rootUrl}deleteUser/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error removing user:", error);
      throw error;
    }
  },
};

export default userServices;
