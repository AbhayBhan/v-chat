import { Document } from "mongoose";

export interface IMessage extends Document {
    to : string;
    from : string;
    text : string;
}

export interface IMsgSend {
    to ?: string;
    from ?: string;
    text ?: string;
}

export interface IGetMsgs {
    to : string;
    from : string;
}