import mongoose from "mongoose";
import { IMessage } from "../interfaces/messageInterfaces";

const messageSchema = new mongoose.Schema({
    to : {
        type : String,
        required : true
    },
    from : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const message = mongoose.model<IMessage>('msgs', messageSchema);
export default message;