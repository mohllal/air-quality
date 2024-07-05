import AirQualityService from '@src/services/AirQualityService';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { ICoordinates } from '@src/models/misc';
import { IReqQuery } from './types/types';
import { IRes } from '@src/routes/types/express/misc';

// **** Functions **** //

/**
 * Find nearest city pollution
 */
async function findNearestCityPollution(
  req: IReqQuery<{latitude: string, longitude: string}>,
  res: IRes,
) {
  const coordinates: ICoordinates = {
    latitude: Number(req.query.latitude),
    longitude: Number(req.query.longitude),
  };

  const pollution = await AirQualityService.findByCoordinates(coordinates);

  return res.status(HttpStatusCodes.OK).json({ pollution });
}


// **** Export default **** //

export default {
  findNearestCityPollution,
} as const;