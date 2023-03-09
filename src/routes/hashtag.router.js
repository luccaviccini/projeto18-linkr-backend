import { Router } from "express"
import auth from "../middlewares/auth.middleware.js";
import { hashtag } from "../controllers/hashtag.controller.js";

const hashtagRoute = Router()

hashtagRoute.get('/hashtag/:hashtag', hashtag)


export default hashtagRoute