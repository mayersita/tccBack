import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import routes from './routes';

require('dotenv').config();
const { ValidationError } = require('express-validation');

const Youch = require('youch');

const databaseConfig = require('./config/database');
const sentryConfig = require('./config/sentry');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.sentry();
    this.middlewares();
    this.database();
    this.routes();
    this.exception();
  }

  sentry() {
    Sentry.init(sentryConfig);
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }

  exception() {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler());
    }
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req);
        return res.json(await youch.toJSON());
      }
      if (err instanceof ValidationError) {
        return res.status(err.status).json(err);
      }
      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().express;
