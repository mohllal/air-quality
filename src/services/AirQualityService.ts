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
    logger.info(`Getting air quality by coordinates ${latitude}, ${longitude}`);

    const response = await httpClient.get<IQAirCityResponse>(
      `/nearest_city?lat=${latitude}&lon=${longitude}&key=${EnvVars.IQAIR.API_KEY}`,
    );
  
    return response.data.data.current.pollution;
  } catch (error) {
    logger.err(`Getting air quality by coordinates - ${error}`);
    throw error;
  }
}

// **** Export default **** //

export default {
  findByCoordinates,
} as const;