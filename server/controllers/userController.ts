import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

import User from '../models/users.model';
import { succesMessageHelper, errorMessageHelper } from '../helpers/handlers';
import loggerHelper from '../helpers/logger';

import { registUserJoiSchema, loginUserJoiSchema } from '../validations/userJoiSchema';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: +req.body.phoneNumber,
    };

    await registUserJoiSchema.validateAsync(payload, { abortEarly: false });

    //* Check if user already exist
    const userData = await User.findOne({
      username: payload.username,
      email: payload.email,
    });

    if (userData) {
      const response = errorMessageHelper({
        statusCode: 400,
        name: 'User exist already',
        message: 'Username and email already exist. Please try using other username and email',
      });
      loggerHelper('info', response);
      return res.status(400).json(response);
    }

    bcrypt.genSalt(10, (err, salt: string) => {
      bcrypt.hash(payload.password, salt, async (err, hash: string) => {
        if (err) throw err;
        payload.password = hash;
        const newUser = new User({ ...payload, accessLevel: 'user' });
        await newUser.save();

        const response = succesMessageHelper(201, 'Created Successfully');
        loggerHelper('info', response);
        res.status(201).json(response);
      });
    });
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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };

    await loginUserJoiSchema.validateAsync(payload, {
      abortEarly: false,
    });

    const userData = await User.findOne({
      username: payload.username,
    });

    if (!userData) {
      const response = errorMessageHelper({
        statusCode: 404,
        name: 'User not found',
        message: "Username or Password is incorrect or doesn't exist. Please try again",
      });
      return res.status(response.statusCode).json(response);
    }

    //* if user exist in db
    const checkPasswordIsCorrect = await bcrypt.compare(payload.password, userData.password);

    if (checkPasswordIsCorrect) {
      //* Generate bearer token
      const obj = {
        id: userData._id,
        email: userData.email,
      };

      const bearerToken = jwt.sign(obj, process.env.SECRET_KEY, {
        expiresIn: '1d', //* 1 day
      });
      res.header('Authorization', `Bearer ${bearerToken}`);
      const response = succesMessageHelper(200, 'Successfully Login');
      res.json(response);
    } else {
      const response = errorMessageHelper({ statusCode: 400, name: 'Password incorrect', message: 'Password is incorrect. Please try again' });
      return res.status(400).json(response);
    }
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
