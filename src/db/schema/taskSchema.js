import Joi from 'joi'

export const addTaskSchema = Joi.object({
    mail: Joi.string().email().normalize().required(),
    taskname: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending'),
})

export const updateTaskSchema = Joi.object({
    mail: Joi.string().email().normalize().required(),
    taskname: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('pending', 'in_progress', 'completed'),
    task_id: Joi.string().required()
})