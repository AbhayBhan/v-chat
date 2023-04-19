import { RequestHandler } from "express";
import { IFriendData, IFriendOps, IFriendRet } from "../interfaces/friendInterfaces";
import { ICheck } from "../interfaces/userInterfaces";
import USER from "../models/userModel";
import createHttpError from "http-errors";

export const addFriend : RequestHandler<unknown,unknown,IFriendOps,unknown> = async (req,res,next) => {
    const {userID,friendID} = req.body;

    try {
        const user = await USER.findOne({_id : userID});
        const friend = await USER.findOne({_id : friendID});

        if(user?.friends.some(frnd => frnd === friendID)){
            throw createHttpError(400,"User is already Friends with this person");
        }

        let userFriendsArray = user?.friends;
        userFriendsArray?.push(friendID);

        let friendFriendsArray = friend?.friends;
        friendFriendsArray?.push(userID);

        await USER.findOneAndUpdate({_id : userID}, {friends : userFriendsArray});

        await USER.findOneAndUpdate({_id : friendID}, {friends : friendFriendsArray});

        const updatedUser = await USER.findOne({_id : userID});
        const updatedFriend = await USER.findOne({_id : friendID});

        res.status(200).json({
            userFriendArray : updatedUser?.friends,
            friendFriendArray : updatedFriend?.friends
        })
    } catch (error) {
        next(error);
    }
};

export const remFriend : RequestHandler<unknown,unknown,IFriendOps,unknown> = async (req,res,next) => {
    const {userID,friendID} = req.body;

    try {
        const user = await USER.findOne({_id : userID});
        const friend = await USER.findOne({_id : friendID});

        if(!user?.friends.some(frnd => frnd === friendID)){
            throw createHttpError(400, "You are not friends with this user");
        }

        const userFriendsArray = user?.friends.filter(frnd => frnd !== friendID);
        const friendFriendsArray = friend?.friends.filter(frnd => frnd !== userID);

        await USER.findOneAndUpdate({_id : userID}, {friends : userFriendsArray});
        await USER.findOneAndUpdate({_id : friendID}, {friends : friendFriendsArray});

        const updatedUser = await USER.findOne({_id : userID});
        const updatedFriend = await USER.findOne({_id : friendID});

        res.status(200).json({
            userFriendArray : updatedUser?.friends,
            friendFriendArray : updatedFriend?.friends
        })
    } catch (error) {
        next(error)
    }
}

export const getFriendArray : RequestHandler<unknown, unknown, IFriendRet, unknown> = async (req,res,next) => {
    const {idArray} = req.body;

    try {
        const friendArr: Array<IFriendData> = await Promise.all(
          idArray.map(async (id) => {
            const temp: IFriendData = {};
            const friend = await USER.findOne({ _id: id }).exec();
            
            temp["id"] = friend?._id;
            temp["username"] = friend?.username;
            temp["email"] = friend?.email;
    
            return temp;
          })
        );
    
        res.status(200).send(friendArr);
      } catch (err) {
        next(err);
      }
}

export const getUser : RequestHandler<ICheck, unknown, unknown, unknown> = async (req,res,next) => {
    const {username} = req.params;
    
    try{
      const user = await USER.findOne({ username }).exec();
  
      if(!user){
        throw createHttpError(400, "User Doesn't Exists");
      }
  
      res.status(200).json({
        username : user.username,
        email : user.email,
        id : user._id,
        friends : user.friends
      });
    } catch(err){
      next(err);
    }
  }
  