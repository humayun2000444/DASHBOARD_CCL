import axios from "axios";
const url = "https://iptsp.cosmocom.net:8001/FREESWITCH/";

const CDRServices = {
  fetchAllCDRData: async () => {
    try {
      const response = await axios.post(url + "admin/getCallHistory");
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  },
};

export default CDRServices;
