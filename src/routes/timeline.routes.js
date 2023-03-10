import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import {newPostSchema} from "../schemas/newPost.schema.js";
import { deletePost, getPosts, postLikePost, postNewPost } from "../controllers/timeline.controllers.js";
import auth from "../middlewares/auth.middleware.js";




const router = Router();

router.post("/timeline", auth ,validateSchema(newPostSchema), postNewPost);
router.get("/timeline", auth , getPosts);
router.post("/timeline/:id", auth, postLikePost);
router.delete("/timeline/:id", auth,deletePost);
router.put("/timeline/:id", auth, () => {});


export default router;

