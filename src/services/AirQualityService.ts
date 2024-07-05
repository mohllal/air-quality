import {
  IQAirCityResponse,
  IQAirPollution,
} from '@src/models/IQAir';

import EnvVars from '@src/common/EnvVars';
import HTTPClient from '@src/util/HttpClient';
import { ICoordinates } from '@src/models/misc';
import logger from 'jet-logger';

// **** Variables **** //

export const httpClient = new HTTPClient(EnvVars.IQAIR.BASE_URL);

// **** Functions **** //

/**
 * Find by coordinates (latitude & longitude)
 */
async function findByCoordinates(
  coordinates: ICoordinates,
): Promise<IQAirPollution> {
  try {
    const { latitude, longitude } = coordinates;
    logger.info(
      'Getting air quality info by coordinates ' + 
      `- ${latitude}, ${longitude} from IQAir nearest city API`,
    );

    const response = await httpClient.get<IQAirCityResponse>(
      `/nearest_city?lat=${latitude}&lon=${longitude}&` + 
      `key=${EnvVars.IQAIR.API_KEY}`,
    );
  
    const pollution = response.data.data.current.pollution;
    logger.info(
      'Got air quality info by coordinates ' +
      `- ${latitude}, ${longitude} - ${JSON.stringify(pollution)} ` +
      'from IQAir nearest city API',
    );
    return pollution;
  } catch (error) {
    logger.err(
      'Failed to get air quality by coordinates ' +
      `- ${coordinates.latitude}, ${coordinates.longitude} ` +
      `- ${error}`,
    );
    throw error;
  }
}

// **** Export default **** //

export default {
  findByCoordinates,
} as const;