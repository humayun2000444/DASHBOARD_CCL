import axios from "axios";
const url = "http://iptsp.cosmocom.net:5070/";

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
