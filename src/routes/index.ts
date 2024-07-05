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

// Nearest city API
airQualityRouter.get(
  Paths.AirQuality.NearestCity,
  validate(['latitude', isLatitude, 'query'], ['longitude', isLongitude, 'query']),
  AirQualityRoute.findNearestCityPollution,
);

apiRouter.use(Paths.AirQuality.Base, airQualityRouter);


// **** Export default **** //

export default apiRouter;
