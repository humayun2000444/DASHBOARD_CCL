import axios from "axios";
import { root } from "../../constants/constants";

const PARTNER_API_BASE_URL = `${root}8001/FREESWITCH/partner/`;

const DidPoolServices = {
  getDidPools: async()=>{
  try {
    const response = await axios.post(`${PARTNER_API_BASE_URL}get-did-pools`);
    return response.data;
  }
  catch (error) {
    console.log("Error fetching did-pools:", error);
    throw error;
  }
}

}
export default DidPoolServices;
