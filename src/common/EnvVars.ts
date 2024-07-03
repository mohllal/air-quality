/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? 'production'),
  Port: (process.env.PORT ?? 3000),
} as const;
