import axios from "axios";
import config from "../../configs/config.json";

const { root } = config;

const getWebRtcServices = {
  fetchAllContacts: async (payload) => {
    try {
      const response = await axios.post(
        root + "8001/FREESWITCH/contact/get-contacts",
        {
          username: payload,
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

      console.error("Error fetching contacts:", errorEx);

      throw errorEx;
    }
  },
  createContact: async (payload) => {
    try {
      const response = await axios.post(
        root + "8001/FREESWITCH/contact/create-contact",
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

      console.error("Error fetching create contact:", errorEx);

      throw errorEx;
    }
  },
  deleteContact: async (id) => {
    try {
      const response = await axios.post(
        root + "8001/FREESWITCH/contact/delete-contact",
        {
          contactId: id,
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

      console.error("Error fetching deleting contact:", errorEx);

      throw errorEx;
    }
  },
  updateContact: async (payload) => {
    try {
      const response = await axios.post(
        root + "8001/FREESWITCH/contact/update-contact",
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

      console.error("Error fetching updating contact:", errorEx);

      throw errorEx;
    }
  },
  getCallsHistory: async (payload) => {
    try {
      const response = await axios.post(
        root + "8001/FREESWITCH/get-call-history",
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

      console.error("Error fetching get call history:", errorEx);

      throw errorEx;
    }
  },
};

export default getWebRtcServices;
