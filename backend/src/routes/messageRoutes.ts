import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messageController";

const router : Router = Router();

router.post('/', sendMessage);

router.post('/get', getMessages);

export default router;