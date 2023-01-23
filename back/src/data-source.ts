import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { config } from './config/config';
import { Recipe } from './entity/Recipe';

export const AppDataSource: DataSource = new DataSource({
  type: config.DB_TYPE as any,
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Recipe],
  migrations: ['./src/migration/*.ts'],
  subscribers: [],
});
