import axios from "axios";
import { cclRootUrl, root } from "../../constants/constants"; // Assuming cclRootUrl is the base API URL

const adminDashboardServices = {
  // Fetch Total Calls for Admin
  fetchTotalCallForAdmin: async (token) => {
    try {
      const response = await axios.post(
        `${cclRootUrl}admin/getTotalCall`,
        {}, // Empty body if not needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Total calls:", error);
      throw error;
    }
  },

  // Fetch Outgoing Calls for Admin
  fetchOutgoingCallForAdmin: async (token) => {
    try {
      const response = await axios.post(
        `${cclRootUrl}admin/getOutgoingCall`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Outgoing calls:", error);
      throw error;
    }
  },

  // Fetch Incoming Calls for Admin
  fetchIncomingCallForAdmin: async (token) => {
    try {
      const response = await axios.post(
        `${cclRootUrl}admin/getIncomingCall`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Incoming calls:", error);
      throw error;
    }
  },

  // Fetch Missed Calls for Admin
  fetchMissedCallForAdmin: async (token) => {
    try {
      const response = await axios.post(
        `${cclRootUrl}admin/getMissedCall`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Missed calls:", error);
      throw error;
    }
  },
};

export default adminDashboardServices;
