import axios from "axios";
import { ILogin } from "../interfaces/userInterfaces";

const base_url: string = "http://localhost:8000";

export async function handleLoginRequest(val : ILogin) : Promise<string> {
    return axios.post(`${base_url}/api/user/login`, val)
        .then((res) => {
            const token : string = res.data.token;
            localStorage.setItem('authToken',JSON.stringify(token));
            return "Success!";
        }).catch((err) => {
            return err.response.data.error;
        })
}
