import { RequestHandler } from "express";
import USER from '../models/userModel';
import bcrypt from 'bcryptjs';
import { IRegister , ILogin , ICheck, IUser } from "../interfaces/userInterfaces";

export const registerUser : RequestHandler<unknown, unknown, IRegister, unknown> = async (req,res) => {
    const {email, username, password} = req.body;
    const user = await USER.findOne({email}).exec();
    if(user){
        res.status(400).json({
            message : "User Already Exists!"
        });
        return;
    };

    const salt : string = await bcrypt.genSalt(10);
    const hashedPassword : string = await bcrypt.hash(password, salt);

    const newUser = await USER.create({
        username, email, password : hashedPassword
    });

    res.status(201).json({
        id : newUser._id,
        username : newUser.username,
        email : newUser.email
    });
};

export const loginUser: RequestHandler<unknown, unknown, ILogin, unknown> = async (req, res) => {
    const {email, password} = req.body;
    const user = await USER.findOne({email}).exec();
    if(!user){
        res.status(400).json({
            message : "User Doesn't Exists!"
        });
        return;
    };

    if((user.password && (await bcrypt.compare(password, user.password)))){
        res.status(200).json({
            id : user._id,
            username : user.username,
            email : user.email
        });
    }
}

export const checkUser : RequestHandler<ICheck, unknown, unknown, unknown> = async (req,res) => {
    const {username} = req.params;
    const user = await USER.findOne({username}).exec();

    if(user){
        res.status(400);
        res.send("Username already exists!");
    }else{
        res.status(200);
        res.send("Username Available!");
    }
}