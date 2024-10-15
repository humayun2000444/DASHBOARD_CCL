import axios from "axios";
import { root } from "../../constants/constants";

const SMS_ROUTE_API_BASE_URL = `${root}8001/FREESWITCH/route/`;

const smsRouteServices = {
  fetchRoutes: async () => {
    try {
      const response = await axios.post(`${SMS_ROUTE_API_BASE_URL}get-routes`);
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching routes:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching route by ID:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching create route:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching upadate route:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching deleting route:", errorEx);

      throw errorEx;
    }
  },
};

export default smsRouteServices;
