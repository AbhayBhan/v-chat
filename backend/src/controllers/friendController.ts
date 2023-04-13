import { RequestHandler } from "express";
import { IFriendAdd } from "../interfaces/friendInterfaces";
import USER from "../models/userModel";
import createHttpError from "http-errors";

export const addFriend : RequestHandler<unknown,unknown,IFriendAdd,unknown> = async (req,res,next) => {
    const {userID,friendID} = req.body;

    try {
        let user = await USER.findOne({_id : userID});
        let friend = await USER.findOne({_id : friendID});

        if(user?.friends.some(frnd => frnd === friendID)){
            throw createHttpError(400,"User is already Friends with this person");
        }

        let userFriendsArray = user?.friends;
        userFriendsArray?.push(friendID);

        let friendFriendsArray = friend?.friends;
        friendFriendsArray?.push(userID);

        user = await USER.findOneAndUpdate({_id : userID}, {friends : userFriendsArray});

        friend = await USER.findOneAndUpdate({_id : friendID}, {friends : friendFriendsArray});

        res.status(200).json({
            userFriendArray : user?.friends,
            friendFriendArray : friend?.friends
        })
    } catch (error) {
        next(error);
    }
}