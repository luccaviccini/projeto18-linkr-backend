import { Router } from "express";
import auth from "../middlewares/auth.middleware.js" 
import { 
    getUsersBySearch, 
    getPostsUserSearched,
    getUserById
    } from "../controllers/user.controller.js";
import { postLikePost } from "../controllers/timeline.controllers.js";

const userRoute = Router();

userRoute.get("/users",auth, getUsersBySearch);
userRoute.get("/usersearched/:id", getUserById);
userRoute.get("/user/:id",auth, getPostsUserSearched);
userRoute.post("/timeline/:id", auth, postLikePost);

export default userRoute;