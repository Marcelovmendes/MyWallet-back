import Joi from "joi";
export const transactionSchema = Joi.object({
    value: Joi.number().positive().required(),
    message: Joi.string().required(),
  });