import { IReq, IRes } from '@src/routes/types/express/misc';

import AirQualityService from '@src/services/AirQualityService';
import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { ICoordinates } from '@src/models/misc';
import { IReqQuery } from './types/types';

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
  const coordinates: ICoordinates = {
    latitude: Number(req.query.latitude),
    longitude: Number(req.query.longitude),
  };

  // Get pollution info by coordinates
  const pollution = await AirQualityService.getPollutionByCoordinates(coordinates);

  return res.status(HttpStatusCodes.OK).json({ pollution });
}


/**
 * Get Paris most polluted info
 */
async function getParisMostPollutedInfo(
  _: IReq,
  res: IRes,
) {
  const coordinates: ICoordinates = {
    latitude: PARIS_LATITUDE,
    longitude: PARIS_LONGITUDE,
  };

  // Get most polluted info by Paris coordinates
  const pollution = 
    await AirQualityService.getMostPollutedByCoordinates(coordinates);

  return res.status(HttpStatusCodes.OK).json({ pollution });
}


// **** Export default **** //

export default {
  getNearestCityPollution,
  getParisMostPollutedInfo,
} as const;