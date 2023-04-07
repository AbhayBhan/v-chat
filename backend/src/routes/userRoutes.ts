import {Router} from "express";
import { checkUser, loginUser, registerUser } from "../controllers/userController";

const router : Router = Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/checkUsername/:username', checkUser);

export default router;