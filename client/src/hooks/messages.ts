import axios from "axios";

const base_url: string = "http://localhost:8000";

export async function getMessages(userID : string,friendID : string|number|undefined) : Promise<Array<object>|string> {
    return axios.post(`${base_url}/api/msg/get`, {to : userID , from : friendID})
        .then((res) => {
            return res.data.messages;
        }).catch((err) => {
            return err.response.data.error;
        })
}