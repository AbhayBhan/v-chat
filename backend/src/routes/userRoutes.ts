import {Router} from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router : Router = Router();

router.post('/', registerUser);

router.post('/login', loginUser);

export default router;