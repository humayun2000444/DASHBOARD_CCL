import axios from "axios";

const url = "https://iptsp.cosmocom.net:8001/FREESWITCH/";

const getWebRtcServices = {
  fetchAllContacts: async (payload) => {
    try {
      const response = await axios.post(url + "contact/get-contacts", {
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
        url + "contact/create-contact",
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
      const response = await axios.post(url + "contact/delete-contact", {
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
        url + "contact/update-contact",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },
};

export default getWebRtcServices;
