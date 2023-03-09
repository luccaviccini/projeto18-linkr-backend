import { Router } from "express";
import auth from "../middlewares/auth.middleware.js" 
import { getUsersBySearch } from "../controllers/user.controller.js";


const userRoute = Router();

userRoute.post("/users", getUsersBySearch);

export default userRoute;