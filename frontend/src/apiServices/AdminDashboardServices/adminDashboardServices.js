import axios from "axios";
// import { root2, root } from "../../constants/constants"; // Assuming root2 is the base API URL
import config from "../../configs/config.json";

const { root, root2 } = config;

const url = `${root2}5070/admin/DashBoard/`;

const adminDashboardServices = {
  // Fetch Total Calls for Admin
  fetchTotalCallForAdmin: async (token, payload) => {
    try {
      const response = await axios.post(`${url}getTotalCall`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Total calls:", error);
      throw error;
    }
  },

  // Fetch Outgoing Calls for Admin
  fetchOutgoingCallForAdmin: async (token, payload) => {
    try {
      const response = await axios.post(`${url}getOutgoingCall`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Outgoing calls:", error);
      throw error;
    }
  },

  // Fetch Incoming Calls for Admin
  fetchIncomingCallForAdmin: async (token, payload) => {
    try {
      const response = await axios.post(`${url}getIncomingCall`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Incoming calls:", error);
      throw error;
    }
  },

  // Fetch Missed Calls for User
  fetchMissedCallForAdmin: async (token, payload) => {
    try {
      const response = await axios.post(`${url}getMissedCall`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Missed calls:", error);
      throw error;
    }
  },

  // Fetch Total Calls for User
  fetchTotalCallForUser: async (payload) => {
    try {
      const response = await axios.post(
        `${root2}5070/user/DashBoard/getTotalCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Total calls:", error);
      throw error;
    }
  },

  // Fetch Outgoing Calls for User
  fetchOutgoingCallForUser: async (payload) => {
    try {
      const response = await axios.post(
        `${root2}5070/user/DashBoard/getOutgoingCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Incoming calls:", error);
      throw error;
    }
  },

  // Fetch Incoming Calls for User
  fetchIncomingCallForUser: async (payload) => {
    try {
      const response = await axios.post(
        `${root2}5070/user/DashBoard/getIncomingCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Outgoing calls:", error);
      throw error;
    }
  },

  // Fetch Missed Calls for User
  fetchMissedCallForUser: async (payload) => {
    try {
      const response = await axios.post(
        `${root2}5070/user/DashBoard/getMissedCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Missed calls:", error);
      throw error;
    }
  },

  //Fetch partner Details for User
  fetchPartnerDetailsUser: async (token, payload) => {
    console.log(token);
    try {
      const response = await axios.post(
        `${root}8001/AUTHENTICATION/getUserByEmail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching  Parner Details:", error);
      throw error;
    }
  },
};

export default adminDashboardServices;
