import axios from "axios";
import { root } from "../../constants/constants";

const partnerPrefixServices = {
  fetchPartnerPrefixByEmail: async (id, token) => {
    console.log(id);
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
      console.error("Error fetching partner by ID:", error);
      throw error;
    }
  },
};

export default partnerPrefixServices;
