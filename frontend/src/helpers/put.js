import Axios from "axios";
import config from "../configs/config.json";
import { expireDateHandler } from "./checkExpireDate";

const { root } = config;

const rootUrl = `${root}8001/AUTHENTICATION/`;

const AuthStr = localStorage.getItem("token");
async function put(url, body = {}, authToken = "") {
  try {
    expireDateHandler();
    const res = await Axios.put(`${rootUrl}${url}`, body, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res;
  } catch (error) {
    return error;
    // if (error.response.status === 404) {
    //   history.push("/404");

    // }
    // else if(error.response.status === 400){
    //   history.push('/400')
    // }

    // throw error;
  }
}

export default put;
