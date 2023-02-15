import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { recipeRouter } from './routes/recipeRoutes';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRoutes';
import { morganMiddleware } from './morgan-middleware/morganMiddleware';
import genericErrorHandler from './exceptions/applicationError';
import notFoundError from './exceptions/notFoundError';
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
app.use(genericErrorHandler);
app.use(notFoundError);

export { app };
