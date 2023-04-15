import {Router} from "express";
import { checkUser, getUserData, loginUser, registerUser } from "../controllers/userController";

const router : Router = Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.post('/getUserData', getUserData);

router.get('/checkUsername/:username', checkUser);

export default router;