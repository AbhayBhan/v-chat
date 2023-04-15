import { Router } from "express";
import { addFriend, getUser, remFriend } from "../controllers/friendController";

const router : Router = Router();

router.post('/add', addFriend);

router.post('/rem', remFriend)

router.get('/find/:username', getUser);

export default router;