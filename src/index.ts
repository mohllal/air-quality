import './pre-start'; // Must be the first import

import EnvVars from '@src/common/EnvVars';
import logger from 'jet-logger';
import server from '@src/server';

// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
