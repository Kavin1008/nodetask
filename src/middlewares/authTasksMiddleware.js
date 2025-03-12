import { addTaskSchema, updateTaskSchema } from "../db/schema/taskSchema.js";

const addTasksValidator = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body, {abortEarly: false})
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((err) => err.message),
        });
    }
    next();
}

const updateTaskValidator = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body, {abortEarly: false})
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((err) => err.message),
        });
    }
    next();
}

export const validateAddTasks = addTasksValidator(addTaskSchema)
export const validateUpdateTasks = updateTaskValidator(updateTaskSchema)