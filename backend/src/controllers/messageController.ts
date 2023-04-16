import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { IGetMsgs, IMessage, IMsgSend } from "../interfaces/messageInterfaces";
import MSG from "../models/messageModel";

export const sendMessage : RequestHandler<unknown,unknown,IMsgSend,unknown> = async (req,res,next) => {
    const {to,from,text} = req.body;
    
    try {
        const msg = await MSG.create({to,from,text});

        if(!msg){
            throw createHttpError(400, "Couldn't send message");
        }

        res.status(200).json({
            to : msg.to,
            from : msg.from,
            text : msg.text
        });
    } catch (error) {
        next(error);
    }
}

export const getMessages : RequestHandler<unknown,unknown,IGetMsgs,unknown> = async (req,res,next) => {
    const {to,from} = req.body;

    try {
        const msgs = await MSG.find({to,from}).sort({createdAt : 'asc'});

        res.status(200).json({
            messages : msgs
        })
    } catch (error) {
        next(error);
    }
}