import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { config } from './config/config';
import { app } from './server';
import { logger } from './logging-file/logger';
import { env } from './envalid/envCheck';

const { PORT } = config;

const bootstrap = async (): Promise<void> => {
  app.listen(PORT || 4000, () => {
    logger.info(env.PORT);

    logger.info(`Server started on port ${PORT}`);
  });

  await AppDataSource.initialize();
};

bootstrap();
