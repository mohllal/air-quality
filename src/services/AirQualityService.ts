import {
  IQAirCityResponse,
  IQAirPollution,
} from '@src/models/IQAir';

import AirQualityRepo from '@src/repos/AirQualityRepo';
import EnvVars from '@src/common/EnvVars';
import HTTPClient from '@src/utils/HttpClient';
import { ICoordinates } from '@src/models/misc';
import logger from 'jet-logger';

// **** Variables **** //

export const httpClient = new HTTPClient(EnvVars.IQAIR.BASE_URL);

// **** Functions **** //

/**
 * Get pollution by coordinates (latitude & longitude)
 */
async function getPollutionByCoordinates(
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

/**
 * Get most pollution info by coordinates (latitude & longitude)
 */
async function getMostPollutedByCoordinates(
  coordinates: ICoordinates,
): Promise<IQAirPollution | undefined> {
  try {
    const { latitude, longitude } = coordinates;
    logger.info(
      'Getting most pollution info by coordinates ' + 
      `- ${latitude}, ${longitude} from database`,
    );

    const airQuality = await AirQualityRepo.getMostPolluted(latitude, longitude);
  
    const pollution = airQuality?.pollution;
  
    logger.info(
      'Got most pollution info by coordinates ' +
      `- ${latitude}, ${longitude} - ${JSON.stringify(pollution)} ` +
      'from database',
    );

    return pollution;
  } catch (error) {
    logger.err(
      'Failed to get most pollution info by coordinates ' +
      `- ${coordinates.latitude}, ${coordinates.longitude} ` +
      `- ${error}`,
    );
    throw error;
  }
}

// **** Export default **** //

export default {
  getPollutionByCoordinates,
  getMostPollutedByCoordinates,
} as const;