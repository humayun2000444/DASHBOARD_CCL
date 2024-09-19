import axios from "axios";
import {root} from "../../constants/constants";

// const url = "https://iptsp.cosmocom.net:8001/FREESWITCH/";

const getWebRtcServices = {
  fetchAllContacts: async (payload) => {
    try {
      const response = await axios.post(root + "/FREESWITCH/contact/get-contacts", {
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
        root + "/FREESWITCH/contact/create-contact",
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
      const response = await axios.post(root + "/FREESWITCH/contact/delete-contact", {
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
        root + "/FREESWITCH/contact/update-contact",
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
      const response = await axios.post(root + "/FREESWITCH/get-call-history", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },
};

export default getWebRtcServices;
