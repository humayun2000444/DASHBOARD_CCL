import axios from "axios";
import config from "../../configs/config.json";

const { root2, root } = config;

const BASE_URL_ADMIN = "5070/admin/DashBoard";

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
            "Content-Type": "application/json", // Ensure the correct content type is set
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

      console.error("Error fetching total calls for admin:", errorEx);

      throw errorEx;
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
            "Content-Type": "application/json", // Ensure the correct content type is set
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

      console.error("Error fetching Outgoning calls for admin:", errorEx);

      throw errorEx;
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
            "Content-Type": "application/json", // Ensure the correct content type is set
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

      console.error("Error fetching Incoming call for admin:", errorEx);

      throw errorEx;
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
            "Content-Type": "application/json", // Ensure the correct content type is set
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

      console.error("Error fetching Missed call for admin:", errorEx);

      throw errorEx;
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
            "Content-Type": "application/json", // Ensure the correct content type is set
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

      console.error("Error fetching  Call Summary for admin:", errorEx);

      throw errorEx;
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
            "Content-Type": "application/json", // Ensure the correct content type is set
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

      console.error("Error fetching CDR History:", errorEx);

      throw errorEx;
    }
  },
};

export default DashboardServices;
