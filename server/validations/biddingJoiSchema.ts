import Joi from 'joi';

export const createAuctionJoiSchema = Joi.object({
  carName: Joi.string().required(),
  image: Joi.string().required(),
  classType: Joi.string().required(),
  startingPrice: Joi.number().required(),
  expiresOn: Joi.string().required(),
});
