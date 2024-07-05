/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and database connection.
 */

import EnvVars from '@src/common/EnvVars';
import logger from 'jet-logger';
import mongoose from 'mongoose';

mongoose
  .connect(EnvVars.MONGODB_URL)
  .then(() => {
    logger.info(':::>  Database connected');
  })
  .catch((error) => {
    logger.err(`:::>  Database connection error - ${error}`);
  });
