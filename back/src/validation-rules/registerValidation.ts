import Joi from 'joi';

export const registerSchema: Joi.ObjectSchema<any> = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().greater(0).required(),
});

export const loginSchema: Joi.ObjectSchema<any> = Joi.object({
  username: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});
