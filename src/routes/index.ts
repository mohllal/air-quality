import { Router } from 'express';
import { IReq, IRes } from './types/express/misc';

import Paths from '../common/Paths';



// **** Variables **** //

const apiRouter = Router();


// ** Add AirQuality ** //

const airQualityRouter = Router();

// Get all users
airQualityRouter.get(
  Paths.AirQuality.Get,
  (_req: IReq, res: IRes) => {
    res.json({});
  },
);


// Add AirQuality
apiRouter.use(Paths.AirQuality.Base, airQualityRouter);


// **** Export default **** //

export default apiRouter;
