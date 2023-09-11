import Joi from 'joi';

export const schemaRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});
export const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
