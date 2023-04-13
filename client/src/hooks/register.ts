import axios from "axios";
import { IUser } from "../interfaces/userInterfaces";

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
    .then((res) => {
      const token : string = res.data.token;
      localStorage.setItem('authToken',JSON.stringify(token));
      return "Created!";
    }).catch((err) => {
      return err.response.data.error;
    })
}
