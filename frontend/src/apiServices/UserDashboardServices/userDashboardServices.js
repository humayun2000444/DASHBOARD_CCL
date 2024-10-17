import axios from "axios";
import config from "../../configs/config.json";

const { root2 } = config;

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
      const response = error.response || { data: { error: error.message } };
      const { status: code, statusText: text, data } = response;
      const errorEx = {
        code,
        message: (typeof data === "string" ? data : data.error) || text,
      };

      console.error("Error fetching total calls:", errorEx);

      throw errorEx;
    }
  },
};

export default userDashboardServices;
