import axios from "axios";
import { ILogin } from "../interfaces/userInterfaces";

const base_url: string = "http://localhost:8000";

export async function handleLoginRequest(val : ILogin) : Promise<string> {
    return axios.post(`${base_url}/api/user/login`, val)
        .then(() => {
            return "Success!";
        }).catch((err) => {
            return err.response.data.error;
        })
}
