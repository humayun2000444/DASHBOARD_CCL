import axios from "axios";
import { root, root2 } from "../../constants/constants";

const CDRServices = {
  fetchAllCDRData: async () => {
    try {
      const response = await axios.post(root2 + "5070/admin/getCallHistory");
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Get call history:", errorEx);

      throw errorEx;
    }
  },
  fetchPartnerPrefixes: async (payload) => {
    console.log(payload);
    try {
      const response = await axios.post(
        root + "8001/FREESWITCH/get-partner-prefix-by-email",
        {
          id: payload,
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

      console.error("Error fetching partner prefixes:", errorEx);

      throw errorEx;
    }
  },

  fetchUserCallHistory: async (payload) => {
    console.log(payload);
    try {
      const response = await axios.post(
        root2 + "5070/user/getCallHistory",
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

      console.error("Error fetching User calls history:", errorEx);

      throw errorEx;
    }
  },
};

export default CDRServices;
