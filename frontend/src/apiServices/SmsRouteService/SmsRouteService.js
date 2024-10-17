import axios from "axios";
import config from "../../configs/config.json";

const { root } = config;

const SMS_ROUTE_API_BASE_URL = `${root}8001/FREESWITCH/route/`;

const smsRouteServices = {
  fetchRoutes: async () => {
    try {
      const response = await axios.post(`${SMS_ROUTE_API_BASE_URL}get-routes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  fetchRouteById: async (id, token) => {
    try {
      const response = await axios.post(
        `${SMS_ROUTE_API_BASE_URL}get-route`,
        {
          idroute: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching partner by ID:", error);
      throw error;
    }
  },

  createRoute: async (data, token) => {
    try {
      const response = await axios.post(
        `${SMS_ROUTE_API_BASE_URL}create-route`,
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

  updateRoute: async (id, userData, token) => {
    try {
      const payload = {
        idroute: id,
        ...userData,
      };

      const response = await axios.post(
        `${SMS_ROUTE_API_BASE_URL}update-route`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating partner:", error);
      throw error;
    }
  },

  deleteRoute: async (id, token) => {
    try {
      const response = await axios.post(
        `${SMS_ROUTE_API_BASE_URL}delete-route`,
        {
          idroute: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting partner:", error);
      throw error;
    }
  },
};

export default smsRouteServices;
