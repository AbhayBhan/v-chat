import { RequestHandler } from "express";
import USER from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import env from "../configs/EnValidator";
import jwt from 'jsonwebtoken'
import { IRegister, ILogin, ICheck } from "../interfaces/userInterfaces";

export const registerUser: RequestHandler<unknown,unknown,IRegister,unknown> = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const user = await USER.findOne({ email }).exec();

    if (user) {
      throw createHttpError(400, "User Already Exists");
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const newUser = await USER.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token : genToken(newUser._id)
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser: RequestHandler<unknown,unknown,ILogin,unknown> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await USER.findOne({ email }).exec();
    
    if(!user){
      throw createHttpError(400, "User Doesn't Exists!")
    }

    if(user.password && (await bcrypt.compare(password, user.password))){
      res.status(200).json({
        id : user._id,
        username : user.username,
        email : user.email,
        token : genToken(user._id)
      });
    } else {
      throw createHttpError(401, "Wrong Password!");
    }  
  } catch (error) {
    next(error);
  }
};

export const checkUser: RequestHandler<ICheck,unknown,unknown,unknown> = async (req, res, next) => {
  const { username } = req.params;

  try{
    const user = await USER.findOne({ username }).exec();
    if(user){
      throw createHttpError(400, "User Already Exists!");
    }

    res.status(200).send("Username Available!");
  } catch(err){
    next(err);
  }
};

const genToken = (id : string) : string => {
  return jwt.sign({id},env.JWT_SECRET,{
    expiresIn : '1d'
  });
}