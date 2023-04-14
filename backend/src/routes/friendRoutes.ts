import { Router } from "express";
import { addFriend, remFriend } from "../controllers/friendController";

const router : Router = Router();

router.post('/add', addFriend);

router.post('/rem', remFriend)

export default router;