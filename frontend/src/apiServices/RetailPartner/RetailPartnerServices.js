import axios from "axios";
import config from "../../configs/config.json";

const { root } = config;

const retailPartnerServices = {
  fetchAllRetailPartners: async () => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/get-retail-partners`
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Retail parents", errorEx);

      throw errorEx;
    }
  },

  createRetailPartner: async (payload) => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/create-retail-partner`,
        payload
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error create Retail Partner:", errorEx);

      throw errorEx;
    }
  },

  deleteRetailPartner: async (payload) => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/delete-retail-partner`,
        payload
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error Deleting retail Partner:", errorEx);

      throw errorEx;
    }
  },

  updateRetailPartner: async (payload) => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/update-retail-partner`,
        payload
      );
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error Updating retail Partner:", errorEx);

      throw errorEx;
    }
  },

  createRetailPartnerFromFile: async (payload) => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/create-retail-partner-from-file`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

      console.error("Error fetching retail partner form file:", errorEx);

      throw errorEx;
    }
  },
};

export default retailPartnerServices;
