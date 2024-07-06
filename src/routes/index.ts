import { isLatitude, isLongitude } from '@src/utils/misc';

import AirQualityRoute from '@src/routes/AirQualityRoute';
import Paths from '@src/common/Paths';
import { Router } from 'express';
import jetValidator from 'jet-validator';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add AirQualityRouter ** //

const airQualityRouter = Router();

// Get pollution info by the nearest city to the provided coordinates.
airQualityRouter.get(
  Paths.AirQuality.NearestCity,
  validate(['latitude', isLatitude, 'query'], ['longitude', isLongitude, 'query']),
  AirQualityRoute.getNearestCityPollution,
);

// Get Paris most polluted info.
airQualityRouter.get(
  Paths.AirQuality.ParisMostPolluted,
  AirQualityRoute.getParisMostPollutedInfo,
);

apiRouter.use(Paths.AirQuality.Base, airQualityRouter);


// **** Export default **** //

export default apiRouter;
