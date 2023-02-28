import 'reflect-metadata';
import { AppDataSource } from 'data-source';
import { config } from '@config/config';
import { env } from '@config/envValidation';
import { app } from 'server';
import { logger } from 'logger';

const { PORT } = config;

const bootstrap = async (): Promise<void> => {
  app.listen(PORT || 4000, () => {
    logger.info(env.PORT);

    logger.info(`Server started on port ${PORT}`);
  });

  await AppDataSource.initialize();
};

bootstrap();
