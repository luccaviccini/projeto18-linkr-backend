import Joi from "joi";

export const newPostSchema = Joi.object({
    url: Joi.string().uri().required(),
    description: Joi.string(),
})

