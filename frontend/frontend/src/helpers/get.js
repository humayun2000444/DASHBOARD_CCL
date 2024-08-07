import Axios from 'axios'

import history from './history'
import { rootUrl } from '../constants/constants'
import { expireDateHandler } from './checkExpireDate';

const AuthStr = localStorage.getItem("token");

async function get(url, authToken = ""){

    
   
   try {
    expireDateHandler();
    const res = await Axios.get(`${rootUrl}${url}`,{

      headers: {
        'authorization': AuthStr
      }
    })
    return await res?.data?.result
   }
    catch (error) {

        // if(error?.response?.status  === 404){
        //     history.push('/404')
        // }

        

        throw error
   }
   
}

export default get


