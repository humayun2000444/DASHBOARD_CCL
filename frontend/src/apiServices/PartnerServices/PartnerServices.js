import axios from "axios";
import { root } from "../../constants/constants";

const PARTNER_API_BASE_URL = `${root}8001/FREESWITCH/partner/`;

const partnerServices = {
  fetchPartners: async () => {
    try {
      const response = await axios.post(`${PARTNER_API_BASE_URL}get-partners`);
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Partner:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching partner by ID:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error Create User:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error Updating partner:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching deleting partner:", errorEx);

      throw errorEx;
    }
  },
};

export default partnerServices;
