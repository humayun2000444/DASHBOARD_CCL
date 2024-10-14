import axios from 'axios';
import { root2,root } from "../../constants/constants";

const BASE_URL_ADMIN = '5070/admin/DashBoard';

const DashboardServices = {

  // Admin: Get Total Calls
  getTotalCallsForAdmin: async (startStamp, endStamp) => {
    const payload = JSON.stringify({
      startStamp,
      endStamp,
    });
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getTotalCall`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the correct content type is set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Total calls for admin: ", error);
      throw error;
    }
  },

  // Admin: Get Outgoing Calls
  getOutgoingCallsForAdmin: async (startStamp, endStamp) => {
    const payload = JSON.stringify({
      startStamp,
      endStamp,
    });
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getOutgoingCall`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the correct content type is set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Outgoing calls for admin: ", error);
      throw error;
    }
  },

  // Admin: Get Incoming Calls
  getIncomingCallsForAdmin: async (startStamp, endStamp) => {
    const payload = JSON.stringify({
      startStamp,
      endStamp,
    });
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getIncomingCall`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the correct content type is set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Incoming calls for admin: ", error);
      throw error;
    }
  },

  // Admin: Get Missed Calls
  getMissedCallsForAdmin: async (startStamp, endStamp) => {
    const payload = JSON.stringify({
      startStamp,
      endStamp,
    });
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getMissedCall`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the correct content type is set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Missed calls for admin: ", error);
      throw error;
    }
  },

  // Admin: Get Call Summary
  getCallSummaryForAdmin: async (startStamp, endStamp) => {
    const payload = JSON.stringify({
      startStamp,
      endStamp,
    });
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getIntervalWiseCall`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the correct content type is set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Call Summary for admin: ", error);
      throw error;
    }
  },

  // Admin: Get CDR History
  getCDRHistory: async (startStamp, endStamp, limit, page) => {
    const payload = JSON.stringify({
      startStamp,
      endStamp,
      limit,
      page,
    });
    try {
      const response = await axios.post(
        `${root}/user/getCallHistory`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json' // Ensure the correct content type is set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching CDR History: ", error);
      throw error;
    }
  }
};

export default DashboardServices;
