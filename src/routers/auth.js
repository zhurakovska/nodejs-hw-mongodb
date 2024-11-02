import * as authControllers from '../controllers/auth.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import {userLoginSchema, userRegisterSchema} from "../validations/users.js";

import {Router} from "express";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.post("/login",validateBody(userLoginSchema),ctrlWrapper(authControllers.loginController))

export default authRouter;
