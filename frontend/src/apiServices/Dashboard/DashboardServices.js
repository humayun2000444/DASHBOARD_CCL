import axios from 'axios';
import { root2 } from "../../constants/constants";

const BASE_URL_USER = '8001/FREESWITCH/user/DashBoard';
const BASE_URL_ADMIN = '8001/FREESWITCH/admin/DashBoard';

const DashboardServices = {

  // User: Get Total Calls
  getTotalCallsForUser: async (callerIdNumbers, startStamp, endStamp) => {
    const payload = {
      callerIdNumber: callerIdNumbers,
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_USER}/getTotalCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Total calls for user: ", error);
      throw error;
    }
  },

  // Admin: Get Total Calls
  getTotalCallsForAdmin: async (startStamp, endStamp) => {
    const payload = {
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getTotalCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Total calls for admin: ", error);
      throw error;
    }
  },

  // User: Get Outgoing Calls
  getOutgoingCallsForUser: async (callerIdNumbers, startStamp, endStamp) => {
    const payload = {
      callerIdNumber: callerIdNumbers,
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_USER}/getOutgoingCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Outgoing calls for user: ", error);
      throw error;
    }
  },

  // Admin: Get Outgoing Calls
  getOutgoingCallsForAdmin: async (startStamp, endStamp) => {
    const payload = {
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getOutgoingCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Outgoing calls for admin: ", error);
      throw error;
    }
  },

  // User: Get Incoming Calls
  getIncomingCallsForUser: async (callerIdNumbers, startStamp, endStamp) => {
    const payload = {
      callerIdNumber: callerIdNumbers,
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_USER}/getIncomingCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Incoming calls for user: ", error);
      throw error;
    }
  },

  // Admin: Get Incoming Calls
  getIncomingCallsForAdmin: async (startStamp, endStamp) => {
    const payload = {
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getIncomingCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Incoming calls for admin: ", error);
      throw error;
    }
  },

  // User: Get Missed Calls
  getMissedCallsForUser: async (callerIdNumbers, startStamp, endStamp) => {
    const payload = {
      callerIdNumber: callerIdNumbers,
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_USER}/getMissedCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Missed calls for user: ", error);
      throw error;
    }
  },

  // Admin: Get Missed Calls
  getMissedCallsForAdmin: async (startStamp, endStamp) => {
    const payload = {
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getMissedCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Missed calls for admin: ", error);
      throw error;
    }
  },

  // User: Get Call Summary
  getCallSummaryForUser: async (callerIdNumbers, startStamp, endStamp) => {
    const payload = {
      callerIdNumber: callerIdNumbers,
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_USER}/getIntervalWiseCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Call Summary for user: ", error);
      throw error;
    }
  },

  // Admin: Get Call Summary
  getCallSummaryForAdmin: async (startStamp, endStamp) => {
    const payload = {
      startStamp,
      endStamp,
    };
    try {
      const response = await axios.post(
        `${root2}${BASE_URL_ADMIN}/getIntervalWiseCall`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Call Summary for admin: ", error);
      throw error;
    }
  },

  // User and Admin: Get CDR History
  getCDRHistory: async (callerIdNumbers, startStamp, endStamp, limit, page) => {
    const payload = {
      callerIdNumber: callerIdNumbers,
      startStamp,
      endStamp,
      limit,
      page,
    };
    try {
      const response = await axios.post(
        `${root2}/user/getCallHistory`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching CDR History: ", error);
      throw error;
    }
  }
};

export default DashboardServices;
