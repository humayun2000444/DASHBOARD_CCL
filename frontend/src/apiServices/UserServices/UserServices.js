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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching user:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching user by ID:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching create user:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching updating user:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching removing user:", errorEx);

      throw errorEx;
    }
  },
};

export default userServices;
