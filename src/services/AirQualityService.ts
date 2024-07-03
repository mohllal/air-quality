import {
  IQAirCityResponse,
  IQAirPollution,
} from '@src/models/IQAir';
import axios, { AxiosResponse } from 'axios';

import EnvVars from '@src/common/EnvVars';
import HttpErrorMessages from '@src/common/HttpErrorMessages';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { ICoordinates } from '@src/models/misc';
import RouteError from '@src/common/RouteError';
import logger from 'jet-logger';

// **** Variables **** //

export const IQAIR_BASE_URL = EnvVars.IQAIR.BASE_URL;
export const IQAIR_API_KEY = EnvVars.IQAIR.API_KEY;

const HTTPClient = axios.create({
  baseURL: IQAIR_BASE_URL,
});

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

    const response: AxiosResponse<IQAirCityResponse> =
      await HTTPClient.get(
        `/nearest_city?lat=${latitude}&lon=${longitude}&key=${IQAIR_API_KEY}`,
      );
    
    const { pollution } = response.data.data.current;
    return pollution;
  } catch (error) {
    logger.err(`Error in getting air quality by coordinates - ${error}`);
  
    if (axios.isAxiosError(error)) {
      throw new RouteError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        HttpErrorMessages.PROVIDER_ERROR,
      );
    } else {
      throw new RouteError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        HttpErrorMessages.UNKNOWN_ERROR,
      );
    }
  }
}

// **** Export default **** //

export default {
  findByCoordinates,
} as const;