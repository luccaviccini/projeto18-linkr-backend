import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { 
    addFollow,
    deleteFollow,
    getFollowerById
} from "../controllers/follow.controller.js";

const followRoute = Router();

followRoute.get("/follows/:followedId", auth, getFollowerById);
followRoute.post("/follows/:followedId", auth, addFollow);
followRoute.delete("/follows/:followedId", auth, deleteFollow);

export default followRoute;