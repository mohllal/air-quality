import AirQualityRepo from '@src/repos/AirQualityRepo';
import AirQualityService from '@src/services/AirQualityService';
import EnvVars from '@src/common/EnvVars';
import { IAirQuality } from '@src/models/AirQuality';
import logger from 'jet-logger';

// **** Variables **** //

const PARIS_LATITUDE = EnvVars.PAIRS_COORDINATES.LATITUDE;
const PARIS_LONGITUDE = EnvVars.PAIRS_COORDINATES.LONGITUDE;

// **** Functions **** //

/**
 * Poll Paris air quality info
 */
async function parisAirQualityTask () {
  const pollution = await AirQualityService.getPollutionByCoordinates({
    latitude: PARIS_LATITUDE,
    longitude: PARIS_LONGITUDE,
  });

  const airQuality: IAirQuality = {
    latitude: PARIS_LATITUDE,
    longitude: PARIS_LONGITUDE,
    pollution: {
      ts: pollution.ts,
      aqius: pollution.aqius,
      mainus: pollution.mainus,
      aqicn: pollution.aqicn,
      maincn: pollution.maincn,
    },
  };

  await AirQualityRepo.add(airQuality);
  logger.info(
    'Saved air quality info by coordinates ' +
    `- ${PARIS_LATITUDE}, ${PARIS_LONGITUDE} - ${JSON.stringify(pollution)} ` +
    'from IQAir nearest city API',
  );
}

// **** Export default **** //

export default {
  parisAirQualityTask,
} as const;