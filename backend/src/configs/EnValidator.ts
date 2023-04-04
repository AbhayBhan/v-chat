import {cleanEnv} from "envalid";
import {port,str} from "envalid/dist/validators";

export default cleanEnv(process.env, {
    NODE_PORT : port(),
    MONGO_CONN_KEY : str()
});