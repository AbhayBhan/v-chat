import axios from "axios";
import { IUser } from "../interfaces/userInterfaces";
import { getFriendData } from "./findUser";

const base_url: string = "http://localhost:8000";

export function checkUsername(val: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base_url}/api/user/checkUsername/${val}`)
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        resolve(false); 
      });
  });
}

export async function submitUser(val : IUser) : Promise<String> {
  return axios.post(`${base_url}/api/user/`, val)
    .then(async (res) => {
      const token : string = res.data.token;
      const uid : string = res.data.id;
      const friends : Array<string> = res.data.friends;

      let friendsData = await getFriendData(friends);
      if(typeof(friendsData) === "string"){
        friendsData = [];
      }else{
        localStorage.setItem('friends',JSON.stringify(friendsData));
      }

      localStorage.setItem('authToken',JSON.stringify(token));
      localStorage.setItem('uid',JSON.stringify(uid));
      return "Created!";
    }).catch((err) => {
      return err.response.data.error;
    })
}
