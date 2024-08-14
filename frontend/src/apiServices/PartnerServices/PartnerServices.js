import axios from "axios";
import { root } from "../../constants/constants";

const PARTNER_API_BASE_URL = `${root}8001/FREESWITCH/partner/`;

const partnerServices = {
  fetchPartners: async () => {
    try {
      const response = await axios.post(`${PARTNER_API_BASE_URL}get-partners`);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  fetchPartnerById: async (id, token) => {
    try {
      const response = await axios.post(
        `${PARTNER_API_BASE_URL}get-partner`,
        {
          idPartner: id,
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

  createPartner: async (data, token) => {
    try {
      const response = await axios.post(
        `${PARTNER_API_BASE_URL}create-partner`,
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

  updatePartner: async (id, userData, token) => {
    try {
      const payload = {
        idPartner: id,
        ...userData,
      };

      const response = await axios.post(
        `${PARTNER_API_BASE_URL}update-partner`,
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

  deletePartner: async (id, token) => {
    try {
      const response = await axios.post(
        `${PARTNER_API_BASE_URL}delete-partner`,
        {
          idPartner: id,
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

export default partnerServices;
