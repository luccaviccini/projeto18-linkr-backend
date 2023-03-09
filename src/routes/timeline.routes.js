import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.middleware.js";
import {newPostSchema} from "../schemas/newPost.schema.js";


const router = Router();

router.post("/new", (req, res) => {
    res.send("ok")
});

export default router;

