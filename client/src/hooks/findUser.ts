import axios from "axios";
import { IFriendData } from "../interfaces/userInterfaces";

const base_url: string = "http://localhost:8000";

export async function getUser(val : string) : Promise<object|string>{
    return axios.get(`${base_url}/api/friend/find/${val}`)
    .then((res) => {
      const data = res.data;
      return data;
    }).catch((err) => {
      return err.response.data.error;
    })
}

export async function getFriendData(val : Array<string>) : Promise<Array<IFriendData>|string>{
  return axios.post(`${base_url}/api/friend/getfrienddata`, {
    idArray : val
  }).then((res) => {
    const {data} = res;
    console.log(data);
    return data;
  }).catch((err) => {
    return err.response.data.error;
  })
}
