import axios from "axios";
const url = "https://103.95.96.98:8001/FREESWITCH/";

const getCclIpTraffic = {
  fetchCCLIpData: async () => {
    try {
      const response = await axios.post(url + "get-partner-details");
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching CCLIP data:", errorEx);

      throw errorEx;
    }
  },

  fetchCCLIpDataOutgoing: async () => {
    try {
      const response = await axios.post(url + "get-outgoing-calls");
      return response.data;
    } catch (error) {
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching Outgoning Call:", errorEx);

      throw errorEx;
    }
  },
};

export default getCclIpTraffic;
