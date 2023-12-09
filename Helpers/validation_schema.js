import Joi from 'joi';

const registerSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().allow(''),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    
})

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
})


const prefSchema = Joi.object({
    userId: Joi.string().required(),
    accountType: Joi.string().required(),
    accountName: Joi.string().required(),
    developmentOptions: Joi.string().required()
})

export {registerSchema,loginSchema, prefSchema};