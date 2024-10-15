import axios from "axios";
import { root2, root } from "../../constants/constants"; // Assuming root2 is the base API URL

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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Total calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Outgoing calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Incoming calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Missed calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Total calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Outgoing calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Incoming calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Missed calls:", errorEx);

      throw errorEx;
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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching User detail:", errorEx);

      throw errorEx;
    }
  },
};

export default adminDashboardServices;
