import express,{Express, Request, Response, NextFunction} from "express";
import cors from "cors"
import "dotenv/config";
import morgan from 'morgan'
import mongoose from "mongoose";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./src/routes/userRoutes";
import env from "./src/configs/EnValidator";

const app : Express = express();
const PORT = env.NODE_PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/user', userRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

mongoose.connect(env.MONGO_CONN_KEY)
    .then(() => {
        app.listen(PORT, () : void => {
            console.log(`Server Functional on Port ${PORT}`);
        });
    }).catch((err) => {
        console.error(err.message);
    })

