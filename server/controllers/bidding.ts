import { Request, Response } from 'express';
import moment from 'moment';
import Joi from 'joi';

import Bidding from '../models/biddings.model';
import { succesMessageHelper, errorMessageHelper } from '../helpers/handlers';
import loggerHelper from '../helpers/logger';
import { createAuctionJoiSchema } from '../validations/biddingJoiSchema';
import { decodeToken } from '../helpers/auth';

export const createAuction = async (req: Request, res: Response) => {
  try {
    const { carName, image, classType, startingPrice, expiresOn } = req.body;

    const payload = { carName, image, classType, startingPrice, expiresOn: moment(expiresOn).format('YYYY-MM-DD HH:mm:ss') };

    //* decode bearer token
    const decoded = decodeToken(req);

    //* Validate payloads
    await createAuctionJoiSchema.validateAsync(payload, { abortEarly: false });

    const newProductForBidding = new Bidding({ ...payload, createdBy: decoded.id });
    await newProductForBidding.save();

    const response = succesMessageHelper(201, 'Car for bidding created Successfully');
    loggerHelper('info', response);
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      const response = errorMessageHelper({ statusCode: 400, name: 'Bad Request', message: error.details[0].message });
      loggerHelper('error', response);

      return res.status(400).json(response);
    }

    const { name, message } = error;
    const response = loggerHelper('error', errorMessageHelper({ statusCode: 500, name, message }));
    res.status(500).json(response);
  }
};

export const getAllBids = async (req: Request, res: Response) => {
  const allData = await Bidding.find({
    deletedAt: null,
    deletedBy: null,
  }).populate('createdBy', '_id fullName email phoneNumber');
  res.json(allData);
};
