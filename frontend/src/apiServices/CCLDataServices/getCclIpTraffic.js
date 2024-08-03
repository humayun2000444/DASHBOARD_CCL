import axios from "axios";
const url = "http://103.95.96.98:8001/FREESWITCH/";

const getCclIpTraffic = {
  fetchCCLIpData: async () => {
    try {
      const response = await axios.post(url + "get-partner-details");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },
  fetchCCLIpDataOutgoing: async () => {
    try {
      const response = await axios.post(url + "get-outgoing-calls");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },
};

export default getCclIpTraffic;
