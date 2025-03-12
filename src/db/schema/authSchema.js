import Joi from "joi"

export const loginSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    authToken : [Joi.string(), Joi.number()]
})

export const registerSchema = Joi.object({
    uname: Joi.string().required(),
    mail: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
})