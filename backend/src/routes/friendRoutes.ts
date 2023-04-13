import { Router } from "express";
import { addFriend } from "../controllers/friendController";

const router : Router = Router();

router.post('/add', addFriend);

export default router;