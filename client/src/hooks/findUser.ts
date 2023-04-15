import axios from "axios";

const base_url: string = "http://localhost:8000";

export async function getUser(val : string) : Promise<object|string>{
    return axios.get(`${base_url}/api/friend/find/${val}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      return data;
    }).catch((err) => {
      return err.response.data.error;
    })
}