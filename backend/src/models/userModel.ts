import mongoose from "mongoose";
import { IUser } from "../interfaces/userInterfaces";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    name : {
        type : String,
        default : "newCutiePatootie"
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    friends : {
        type : Array<String>,
        default : []
    }
},{
    timestamps : true 
});

const user = mongoose.model<IUser>('users', userSchema);
export default user;