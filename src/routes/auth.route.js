import { Router } from "express";
import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import { signUp } from "../controllers/auth.controller.js";


const route = Router()

route.post('/signup',validateSchema(signUpSchema),signUp)

export default route