import axios from "axios";
import config from "../../configs/config.json";

const { root } = config;

const getWebRtcServices = {
  fetchAllContacts: async (payload) => {
    try {
      const response = await axios.post(root + "8001/FREESWITCH/contact/get-contacts", {
        username: payload,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
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
      console.error("Error creating contact:", error);
      throw error;
    }
  },
  deleteContact: async (id) => {
    try {
      const response = await axios.post(root + "8001/FREESWITCH/contact/delete-contact", {
        contactId: id,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
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
      console.error("Error creating contact:", error);
      throw error;
    }
  },
  getCallsHistory: async (payload) => {
    try {
      const response = await axios.post(root + "8001/FREESWITCH/get-call-history", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },
};

export default getWebRtcServices;
