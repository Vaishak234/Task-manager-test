import Joi from "joi";

export const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'progress', 'completed').required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    dueDate: Joi.date().required().allow(null),
});
