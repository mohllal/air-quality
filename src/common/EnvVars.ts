/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? 'production'),
  Port: (process.env.PORT ?? 3000),
  IQAIR: {
    API_KEY: (process.env.IQAIR_API_KEY ?? ''),
    BASE_URL: (process.env.IQAIR_BASE_URL ?? 'http://api.airvisual.com/v2/'),
  },
} as const;
