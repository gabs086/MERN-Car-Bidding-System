import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import loggerHelper from './helpers/logger';

import users from './routes/users';
import refreshToken from './routes/refreshToken';
import cars from './routes/cars';
import biddings from './routes/bidding';

//*Middleware configs
dotenv.config();
const app = express();
const PORT = 5000;
const corsConfig = {
   origin: process.env.CLIENT_BASE_URL,
   exposedHeaders: 'Authorization',
};
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);

//*Log all incoming request
app.use((req: express.Request, res: express.Response, next) => {
   loggerHelper('info', req.body);
   next();
});

//* API Routes
app.use('/api/users', users);
app.use('/api/auth', refreshToken);
app.use('/api/cars', cars);
app.use('/api/biddings', biddings);

//*DB Connection
const db = process.env.MONGODB_CONNECTION;
mongoose
   .connect(db)
   .then(() => console.log('MongoDB successfully connected'))
   .catch((err) => console.log(err));

//* Server Connection
app.listen(PORT, () => console.log(`App running in port ${PORT}`));
