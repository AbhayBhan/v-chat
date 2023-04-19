import axios from "axios";
import { useId } from "react";

const base_url: string = "http://localhost:8000";

export async function getMessages(userID : string,friendID : string|number|undefined) : Promise<Array<object>|string> {
    return axios.post(`${base_url}/api/msg/get`, {to : userID , from : friendID})
        .then((res) => {
            return res.data.messages;
        }).catch((err) => {
            return err.response.data.error;
        })
}

//send Message
export async function sendMessage(userID : string, friendID : string|number|undefined, message : string) : Promise<object|string> {
    return axios.post(`${base_url}/api/msg/`, {to : userID, from : friendID, text : message})
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.data.error;
        })
}