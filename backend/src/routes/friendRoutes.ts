import { Router } from "express";
import { addFriend, getFriendArray, getUser, remFriend } from "../controllers/friendController";

const router : Router = Router();

router.post('/add', addFriend);

router.post('/rem', remFriend)

router.post('/getfrienddata', getFriendArray);

router.get('/find/:username', getUser);

export default router;