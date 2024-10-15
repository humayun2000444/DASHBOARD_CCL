import axios from "axios";
import { root } from "../../constants/constants";

const partnerPrefixServices = {
  fetchPartnerPrefixByEmail: async (id, token) => {
    try {
      const response = await axios.post(
        `${root}8001/FREESWITCH/get-partner-prefix-by-email`,
        {
          id: id,
        },
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

      console.error("Error fetching prefix by email:", errorEx);

      throw errorEx;
    }
  },
};

export default partnerPrefixServices;
