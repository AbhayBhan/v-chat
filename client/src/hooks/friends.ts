import axios from "axios";

const base_url: string = "http://localhost:8000";

export async function addFriend(userID : string, friendID : string|number|undefined) : Promise<string>{
    return axios.post(`${base_url}/api/friend/add`, {userID, friendID})
        .then(() => {
            console.log("Added Friend");
            return "Success";
        }).catch((err) => {
            return err.response.data.error;
        })
}