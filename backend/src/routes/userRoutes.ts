import {Router} from "express";
import { registerUser } from "../controllers/userController";

const router : Router = Router();

router.post('/', registerUser);

router.post('/login', () => {

})

export default router;