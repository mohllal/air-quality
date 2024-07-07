import { IReq, IRes } from '@src/routes/types/express/misc';

import AirQualityService from '@src/services/AirQualityService';
import EnvVars from '@src/common/EnvVars';
import HttpClientError from '@src/common/HttpClientError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { ICoordinates } from '@src/models/misc';
import { IReqQuery } from './types/types';
import RouteError from '@src/common/RouteError';

// **** Variables **** //

const PARIS_LATITUDE = EnvVars.PAIRS_COORDINATES.LATITUDE;
const PARIS_LONGITUDE = EnvVars.PAIRS_COORDINATES.LONGITUDE;


// **** Functions **** //

/**
 * Get nearest city pollution
 */
async function getNearestCityPollution(
  req: IReqQuery<{latitude: string, longitude: string}>,
  res: IRes,
) {
  try {
    const coordinates: ICoordinates = {
      latitude: Number(req.query.latitude),
      longitude: Number(req.query.longitude),
    };
  
    // Get pollution info by coordinates
    const pollution = await AirQualityService.getPollutionByCoordinates(coordinates);
  
    return res.status(HttpStatusCodes.OK).json({ pollution });
  } catch (error) {
    if (error instanceof HttpClientError) {
      throw new RouteError(
        error.cause.response?.status || HttpStatusCodes.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
    
    throw error;
  }
}


/**
 * Get Paris most polluted info
 */
async function getParisMostPollutedInfo(
  _: IReq,
  res: IRes,
) {
  try {
    const coordinates: ICoordinates = {
      latitude: PARIS_LATITUDE,
      longitude: PARIS_LONGITUDE,
    };
  
    // Get most polluted info by Paris coordinates
    const pollution = 
      await AirQualityService.getMostPollutedByCoordinates(coordinates);
  
    return res.status(HttpStatusCodes.OK).json({ pollution });
  } catch (error) {
    if (error instanceof HttpClientError) {
      throw new RouteError(
        error.cause.response?.status || HttpStatusCodes.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
    
    throw error;
  }
}


// **** Export default **** //

export default {
  getNearestCityPollution,
  getParisMostPollutedInfo,
} as const;