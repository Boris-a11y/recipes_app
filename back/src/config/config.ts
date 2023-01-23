import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT);
const DB_PORT = Number(process.env.DB_PORT);
const DB_HOST = String(process.env.DB_HOST);
const DB_TYPE = String(process.env.DB_TYPE);
const DB_USERNAME = String(process.env.DB_USERNAME);
const DB_PASSWORD = String(process.env.DB_PASSWORD);
const DATABASE = String(process.env.DATABASE);
const JWT_SECRET = String(process.env.JWT_SECRET);
const JWT_EXPIRES_IN = String(process.env.JWT_EXPIRES_IN);
const COOKIE_NAME = String(process.env.COOKIE_NAME);

export const config = {
  PORT,
  DB_PORT,
  DB_HOST,
  DB_TYPE,
  DB_USERNAME,
  DB_PASSWORD,
  DATABASE,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_NAME,
};
