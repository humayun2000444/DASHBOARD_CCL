import axios from "axios";
const url = "http://103.95.96.98:8001/FREESWITCH/";

const getCclTdmTraffic = {
  fetchCCLTdmData: async () => {
    try {
      const response = await axios.post(url + "get-btcl-calls");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },
};

export default getCclTdmTraffic;
