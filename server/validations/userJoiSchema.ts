import Joi from 'joi';

export const registUserJoiSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phoneNumber: Joi.number().required(),
});

export const loginUserJoiSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
