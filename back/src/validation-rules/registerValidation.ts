import Joi from 'joi';

export class ValidationRules {
  registerSchema: Joi.ObjectSchema<any> = register();
  loginSchema: Joi.ObjectSchema<any> = login();
}

function login(): Joi.ObjectSchema<any> {
  return Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
}

function register(): Joi.ObjectSchema<any> {
  return Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().greater(0).required(),
  });
}
