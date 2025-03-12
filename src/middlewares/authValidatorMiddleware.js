import { loginSchema, registerSchema } from "../db/schema/authSchema.js";

const loginValidator = (schema) => (req, res, next) => {
   const {error} = schema.validate(req.body, {abortEarly: false})
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((err) => err.message),
        });
    }
    next();
}

const registerValidator = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body, {abortEarly: false})
    if(error)
    {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((err) => err.message),
        });
    }

    next();
}



export const validateLogin = loginValidator(loginSchema)
export const validateRegister = registerValidator(registerSchema)
