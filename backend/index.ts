import express,{Express} from "express";
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./src/routes/userRoutes";
import env from "./src/configs/EnValidator";

const app : Express = express();
const PORT = env.NODE_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/user', userRoutes);

mongoose.connect(env.MONGO_CONN_KEY)
    .then(() => {
        app.listen(PORT, () : void => {
            console.log(`Server Functional on Port ${PORT}`);
        });
    }).catch((err) => {
        console.error(err.message);
    })

