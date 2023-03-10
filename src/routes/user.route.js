import { Router } from "express";
import auth from "../middlewares/auth.middleware.js" 
import { getUsersBySearch, getPostsUserSearched } from "../controllers/user.controller.js";


const userRoute = Router();

userRoute.get("/users",auth, getUsersBySearch);
userRoute.get("/user/:id",auth, getPostsUserSearched);

export default userRoute;