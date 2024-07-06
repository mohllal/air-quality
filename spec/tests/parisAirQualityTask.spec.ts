import AirQualityRepo from '@src/repos/AirQualityRepo';
import AirQualityService from '@src/services/AirQualityService';
import AirQualityTask from '@src/tasks/ParisAirQualityTask';
import EnvVars from '@src/common/EnvVars';
import { IAirQuality } from '@src/models/AirQuality';
import { IQAirPollution } from '@src/models/IQAir';
import { faker } from '@faker-js/faker';

const getDummyPollution = () => {
  return {
    ts: faker.date.past().toLocaleString(),
    aqius: faker.number.int({ min: 1, max: 100}),
    mainus: 'p2',
    aqicn: faker.number.int({ min: 1, max: 100}),
    maincn: 'p2',
  } as IQAirPollution;
};

describe('AirQualityTask', () => {
  it('should add air quality info for Paris to database', async () => {
    // Get dummy pollution
    const dummyPollution = getDummyPollution();
  
    // Create getPollutionByCoordinates function spy
    const getPollutionByCoordinatesSpy =
      spyOn(AirQualityService, 'getPollutionByCoordinates').and.resolveTo(dummyPollution);

    // Create add function spy
    const addSpy = spyOn(AirQualityRepo, 'add').and.resolveTo();

    // Call the parisAirQualityTask function
    await AirQualityTask.parisAirQualityTask();

    // Assert that the getPollutionByCoordinates function 
    // with called with Paris coordinates
    expect(getPollutionByCoordinatesSpy).toHaveBeenCalledWith({
      latitude: EnvVars.PAIRS_COORDINATES.LATITUDE,
      longitude: EnvVars.PAIRS_COORDINATES.LONGITUDE,
    });

    // Assert that the getPollutionByCoordinates function 
    // with called with Paris coordinates and pollution
    expect(addSpy).toHaveBeenCalledWith({
      latitude: EnvVars.PAIRS_COORDINATES.LATITUDE,
      longitude: EnvVars.PAIRS_COORDINATES.LONGITUDE,
      pollution: dummyPollution,
    } as IAirQuality);
  });

  it('should throw an error when the AirQualityService.getPollutionByCoordinates function fails', async () => {
    // Create getPollutionByCoordinates function spy
    const getPollutionByCoordinatesSpy =
      spyOn(AirQualityService, 'getPollutionByCoordinates').and.rejectWith(new Error('Network error!'));
    
    // Call the parisAirQualityTask function and assert that it is rejected
    await expectAsync(AirQualityTask.parisAirQualityTask()).toBeRejected();

    // Assert that the getPollutionByCoordinates function 
    // with called with Paris coordinates
    expect(getPollutionByCoordinatesSpy).toHaveBeenCalledWith({
      latitude: EnvVars.PAIRS_COORDINATES.LATITUDE,
      longitude: EnvVars.PAIRS_COORDINATES.LONGITUDE,
    });
  });

  it('should throw an error when the AirQualityRepo.add function fails', async () => {
    // Get dummy pollution
    const dummyPollution = getDummyPollution();
  
    // Create getPollutionByCoordinates function spy
    const getPollutionByCoordinatesSpy =
      spyOn(AirQualityService, 'getPollutionByCoordinates').and.resolveTo(dummyPollution);

    // Create add function spy
    const addSpy = spyOn(AirQualityRepo, 'add').and.rejectWith(new Error('Database error!'));

    // Call the parisAirQualityTask function and assert that it is rejected
    await expectAsync(AirQualityTask.parisAirQualityTask()).toBeRejected();

    // Assert that the getPollutionByCoordinates function 
    // with called with Paris coordinates
    expect(getPollutionByCoordinatesSpy).toHaveBeenCalledWith({
      latitude: EnvVars.PAIRS_COORDINATES.LATITUDE,
      longitude: EnvVars.PAIRS_COORDINATES.LONGITUDE,
    });

    // Assert that the getPollutionByCoordinates function 
    // with called with Paris coordinates and pollution
    expect(addSpy).toHaveBeenCalledWith({
      latitude: EnvVars.PAIRS_COORDINATES.LATITUDE,
      longitude: EnvVars.PAIRS_COORDINATES.LONGITUDE,
      pollution: dummyPollution,
    } as IAirQuality);
  });
});