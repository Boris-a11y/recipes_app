import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@entity/User';
import { Recipe } from '@entity/Recipe';
import { config } from '@config/config';

export const AppDataSource: DataSource = new DataSource({
  type: (config.DB_TYPE as any) || 'postgres',
  host: config.DB_HOST || 'localhost',
  port: config.DB_PORT,
  username: config.DB_USERNAME || 'postgres',
  password: config.DB_PASSWORD || 'postgres',
  database: config.DATABASE || 'recipeapp',
  synchronize: true,
  logging: false,
  entities: [User, Recipe],
  migrations: ['./src/migration/*.ts'],
  subscribers: [],
});
