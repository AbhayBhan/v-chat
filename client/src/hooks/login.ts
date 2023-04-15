import axios from "axios";
import { ILogin } from "../interfaces/userInterfaces";
import { getFriendData } from "./findUser";

const base_url: string = "http://localhost:8000";

export async function handleLoginRequest(val: ILogin): Promise<string> {
  return axios
    .post(`${base_url}/api/user/login`, val)
    .then(async(res) => {
      const token: string = res.data.token;
      const uid: string = res.data.id;
      const friends: Array<string> = res.data.friends;

      let friendsData = await getFriendData(friends);
      if (typeof friendsData === "string") {
        friendsData = [];
      } else {
        localStorage.setItem("friends", JSON.stringify(friendsData));
      }

      localStorage.setItem("authToken", JSON.stringify(token));
      localStorage.setItem("uid", JSON.stringify(uid));
      return "Success!";
    })
    .catch((err) => {
      return err.response.data.error;
    });
}
