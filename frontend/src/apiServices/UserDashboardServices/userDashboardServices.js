import axios from "axios";
import { root2 } from "../../constants/constants";

const userDashboardServices = {
  fetchTotalCallForUser: async (token, callerIdNumber, domainName) => {
    try {
      const response = await axios.post(
        `${root2}5070/getTotalCallForUser`,
        {
          callerIdNumber,
          domainName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers for authentication
          },
        }
      );
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching Total calls:", error);
      throw error;
    }
  },
};

export default userDashboardServices;
