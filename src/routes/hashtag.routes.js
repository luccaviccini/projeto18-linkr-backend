
import { Router } from "express";
import { listHashtags, trendingHashtags } from "../controllers/Hashtag.controllers.js";
import auth from "../middlewares/auth.middleware.js";

const hashtagRoutes = Router();

hashtagRoutes.get('/hashtag', auth, trendingHashtags);
hashtagRoutes.get('/hashtag/:hashtag', auth, listHashtags)

export default hashtagRoutes;