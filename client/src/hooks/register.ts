import axios from "axios";
import { IUser } from "../interfaces/userInterfaces";

const base_url: string = "http://localhost:8000";

export function checkUsername(val: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${base_url}/api/user/checkUsername/${val}`)
      .then((res) => {
        if (res.status === 401) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        resolve(false); 
      });
  });
}

export function submitUser(val : IUser) {
  axios.post(`${base_url}/api/user/`, val)
    .then((res) => {

    }).
}
