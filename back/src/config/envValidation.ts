import { cleanEnv, str, num } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num(4000 as any),
  DB_PORT: num({ default: 5432 }),
  DB_HOST: str({ default: 'localhost' }),
  DB_TYPE: str({ default: 'postgres' }),
  DB_USERNAME: str({ default: 'postgres' }),
  DB_PASSWORD: str({ default: 'postgres' }),
  DATABASE: str({ default: 'database' }),
  JWT_EXPIRES_IN: str({ choices: ['1d', '7d', '14d'], default: '1d' }),
  COOKIE_NAME: str({ default: 'k_id' }),
});
