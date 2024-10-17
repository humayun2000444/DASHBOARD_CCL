import Axios from "axios";
import { expireDateHandler } from "./checkExpireDate";
import config from "../configs/config.json";

const { root } = config;

const rootUrl = `${root}8001/AUTHENTICATION/`

const AuthStr = localStorage.getItem("token");

async function get(url, authToken = "") {
  try {
    expireDateHandler();
    const res = await Axios.get(`${rootUrl}${url}`, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res?.data?.result;
  } catch (error) {
    // if(error?.response?.status  === 404){
    //     history.push('/404')
    // }

    throw error;
  }
}

export default get;
