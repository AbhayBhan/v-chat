import { RequestHandler } from "express";
import USER from '../models/userModel';
import { IRegister } from "../interfaces/userInterfaces";

export const registerUser : RequestHandler<unknown, unknown, IRegister, unknown> = async (req,res) => {
    const {email, username, password} = req.body;
    const user = await USER.findOne({email}).exec();
    if(user){
        res.status(400).json({
            message : "User Already Exists!"
        });
        return;
    };

    const newUser = await USER.create({
        username, email, password
    });

    res.status(201).json({
        id : newUser._id,
        username : newUser.username,
        email : newUser.email,
    })
};