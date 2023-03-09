import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import {newPostSchema} from "../schemas/newPost.schema.js";
import { postNewPost } from "../controllers/timeline.controllers.js";
import auth from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/timeline", auth ,validateSchema(newPostSchema), postNewPost);

export default router;

