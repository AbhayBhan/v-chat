import { Document } from "mongoose";

export interface IUser extends Document {
    username : string;
    email : string;
    name : string;
    password : string;
    friends : Array<string>;
}

export interface IUserRet {
    id : string;
}

export interface IRegister {
    username : string; 
    email : string;
    password : string;
}

export interface ILogin {
    email : string;
    password : string
}

export interface ICheck {
    username : string
}