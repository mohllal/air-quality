import AirQualityRoutes from '@src/routes/AirQualityRoutes';
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
  validate(['latitude', 'number', 'query'], ['longitude', 'number', 'query']),
  AirQualityRoutes.findNearestCityPollution,
);

apiRouter.use(Paths.AirQuality.Base, airQualityRouter);


// **** Export default **** //

export default apiRouter;
