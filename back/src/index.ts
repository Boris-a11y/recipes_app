import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { config } from './config/config';
import { app } from './server';

const { PORT } = config;

const bootstrap = async (): Promise<void> => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

  await AppDataSource.initialize();
};

bootstrap();
