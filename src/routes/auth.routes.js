import { Router } from "express";
import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import { signUp, signIn } from "../controllers/auth.controller.js";


const route = Router()

route.post('/sign-up',validateSchema(signUpSchema),signUp)
route.post("/sign-in",validateSchema(signInSchema),signIn)

export default route