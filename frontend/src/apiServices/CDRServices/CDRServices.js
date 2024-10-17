import axios from "axios";
import config from "../../configs/config.json";

const { root, root2 } = config;

const CDRServices = {
  fetchAllCDRData: async () => {
    try {
      const response = await axios.post(root2 + "5070/admin/getCallHistory");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
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
      console.error("Error fetching partner prefixes:", error);
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
      console.error("Error fetching User calls history:", error);
    }
  },
};

export default CDRServices;
