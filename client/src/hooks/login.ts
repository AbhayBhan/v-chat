import axios from "axios";
import { ILogin } from "../interfaces/userInterfaces";

const base_url: string = "http://localhost:8000";

export function handleLoginRequest(val : ILogin) : Promise<string> {
    return new Promise((resolve, reject) => {
        axios.post(`${base_url}/api/user/login`, val)
        .then((res) => {
            if(res.status === 400){
                resolve("User Doesn't Exists");
            } else if(res.status === 401){
                resolve("Wrong Password!");
            } else {
                resolve("Success");
            }
        }).catch(console.error);
    })
}
