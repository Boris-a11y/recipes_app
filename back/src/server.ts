import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { recipeRouter } from './routes/recipeRoutes';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRoutes';

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }),
);

app.use(recipeRouter, authRouter);

export { app };
