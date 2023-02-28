import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { authRouter } from '@routes/authRoutes';
import { recipeRouter } from '@routes/recipeRoutes';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from '@middleware/morganMiddleware';
import errorHandler from '@errorHandlers/errorHandler';
import notFoundError from '@errorHandlers/notFoundError';
import correlator from 'express-correlation-id';

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }),
);

app.use(correlator());

app.use(recipeRouter, authRouter);
app.use(errorHandler);
app.use(notFoundError);

export { app };
