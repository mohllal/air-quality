/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? 'production'),
  Port: Number(process.env.PORT ?? 3000),
  MONGODB_URL: (process.env.MONGODB_URL ?? 'mongodb://db:27017/airquality'),
  HTTP_REQUEST_MAX_RETRIES: Number(process.env.HTTP_REQUEST_MAX_RETRIES ?? 3),
  IQAIR: {
    API_KEY: (process.env.IQAIR_API_KEY ?? ''),
    BASE_URL: (process.env.IQAIR_BASE_URL ?? 'http://api.airvisual.com/v2/'),
  },
  PAIRS_COORDINATES: {
    LATITUDE: Number(process.env.PARIS_LATITUDE ?? 48.856613),
    LONGITUDE: Number(process.env.PARIS_LONGITUDE ?? 2.352222),
  },
  CRON: {
    TIMEZONE: (process.env.CRON_TIMEZONE ?? 'utc'),
    PARIS_TASK_TIME: (process.env.PARIS_TASK_TIME ?? '* * * * *'), // Every minute
  },
} as const;
