/**
 * This file contains all cron job configurations.
 */

import '@src/pre-start'; // Must be the first import

import { CronJob } from 'cron';
import EnvVars from './common/EnvVars';
import ParisAirQualityTask from './tasks/ParisAirQualityTask';
import logger from 'jet-logger';

// **** Variables **** //

const cronJobs: CronJob[] = [];

// **** Functions **** //

/**
 * Configure cron jobs.
 */
function start() {
  logger.info('Starting cron jobs...');

  // Poll paris air quality info every hour
  cronJobs.push(new CronJob(EnvVars.CRON.PARIS_TASK_TIME, async () => {
    try {
      logger.info('Start polling paris air quality info');
      await ParisAirQualityTask.parisAirQualityTask();
      logger.info('Successfully polled paris air quality info');
    } catch (error) {
      logger.err(`Failed to poll paris air quality info - ${error}`);
    }
  }, null, true, EnvVars.CRON.TIMEZONE));

  // Start all cron jobs
  cronJobs.forEach(j => j.start());
}

// **** Start cron jobs **** //

start();

// **** Export default **** //
export default {
  start,
} as const;