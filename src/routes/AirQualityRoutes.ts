import { IReq, IRes } from '@src/routes/types/express/misc';

import AirQualityService from '@src/services/AirQualityService';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { ICoordinates } from '@src/models/misc';

// **** Functions **** //

/**
 * Find nearest city pollution
 */
async function findNearestCityPollution(req: IReq, res: IRes) {
  const { latitude, longitude } = req.query;
  
  const coordinates: ICoordinates = {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };

  const pollution = await AirQualityService.findByCoordinates(coordinates);

  return res.status(HttpStatusCodes.OK).json({ pollution });
}


// **** Export default **** //

export default {
  findNearestCityPollution,
} as const;