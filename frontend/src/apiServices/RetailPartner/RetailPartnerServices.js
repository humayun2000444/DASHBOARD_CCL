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
      console.error("Error fetching Retail partners:", error);
      throw error;
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
      console.log("Error adding Retail Partner:", error);
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
      console.log("Error Deleting retail Partner:", error);
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
      console.log("Error Updating Retail Partner:", error);
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
      console.log("Error Uploading Retail Partner:", error);
    }
  },
};

export default retailPartnerServices;
