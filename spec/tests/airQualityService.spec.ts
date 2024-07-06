import AirQualityService, { httpClient } from '@src/services/AirQualityService';

import AirQualityRepo from '@src/repos/AirQualityRepo';
import EnvVars from '@src/common/EnvVars';
import { IAirQuality } from '@src/models/AirQuality';
import { ICoordinates } from '@src/models/misc';
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

const getDummyCoordinates = () => {
  return {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  } as ICoordinates;
};

const getDummyAirQuality = (latitude?: number, longitude?: number) => {
  const coordinates = getDummyCoordinates();

  return {
    latitude: latitude ?? coordinates.latitude,
    longitude: longitude ?? coordinates.longitude,
    pollution: getDummyPollution(),
  } as IAirQuality;
};

describe('AirQualityService', () => {
  describe('getPollutionByCoordinates', () => {
    it('should return the air quality data for a set of coordinates', async () => {
      // Get dummy coordinates data
      const coordinates = getDummyCoordinates();
  
      // Get dummy pollution data
      const pollution = getDummyPollution();
    
      // Create httpClient.get method spy
      const getSpy = spyOn(httpClient, 'get').and.resolveTo({
        data: {
          data: {
            current: {
              pollution,
            },
          },
        },
      });
  
      // Call the getPollutionByCoordinates function with the coordinates
      const result = await AirQualityService.getPollutionByCoordinates(coordinates);
  
      // Assert that the httpClient.get method was called with the correct URL
      expect(getSpy).toHaveBeenCalledWith(
        `/nearest_city?lat=${coordinates.latitude}&lon=${coordinates.longitude}&` + 
        `key=${EnvVars.IQAIR.API_KEY}`,
      );
  
      // Assert that the getPollutionByCoordinates function returns the correct data
      expect(result).toEqual(pollution);
    });
  
    it('should throw an error when the httpClient.get method fails', async () => {
      // Get dummy coordinates data
      const coordinates = getDummyCoordinates();
  
      // Create httpClient.get method spy
      const getSpy = 
        spyOn(httpClient, 'get')
          .and.rejectWith(new Error('Network error!'));
  
      // Call the getPollutionByCoordinates function and assert that it is rejected
      await expectAsync(AirQualityService.getPollutionByCoordinates(coordinates))
        .toBeRejected();

      // Assert that the httpClient.get method was called with the correct URL
      expect(getSpy).toHaveBeenCalledWith(
        `/nearest_city?lat=${coordinates.latitude}&lon=${coordinates.longitude}&` +
        `key=${EnvVars.IQAIR.API_KEY}`,
      );
    });
  });

  describe('getPollutionByCoordinates', () => {
    it('should return the air quality data for Paris zone', async () => {
      // Get dummy coordinates data
      const coordinates = getDummyCoordinates();
  
      // Get dummy air quality data
      const dummyAirQuality = getDummyAirQuality();
    
      // Create getMostPolluted function spy
      const getMostPollutedSpy = spyOn(AirQualityRepo, 'getMostPolluted').and.resolveTo(dummyAirQuality);
  
      // Call the getMostPollutedByCoordinates function with the coordinates
      const result =
        await AirQualityService.getMostPollutedByCoordinates(coordinates);
  
      // Assert that the getMostPolluted function was called with
      // the correct coordinates
      expect(getMostPollutedSpy).toHaveBeenCalledWith(
        coordinates.latitude,
        coordinates.longitude,
      );
  
      // Assert that the getMostPollutedByCoordinates function
      // returns the correct data
      expect(result).toEqual(dummyAirQuality.pollution);
    });
  
    it('should throw an error when the getMostPolluted function fails', async () => {
      // Get dummy coordinates data
      const coordinates = getDummyCoordinates();
  
      // Create getMostPolluted function spy
      const getMostPollutedSpy = 
        spyOn(AirQualityRepo, 'getMostPolluted')
          .and.rejectWith(new Error('Network error!'));
  
      // Call the getMostPollutedByCoordinates function 
      // and assert that it is rejected
      await expectAsync(AirQualityService.getMostPollutedByCoordinates(coordinates))
        .toBeRejected();
  
      // Assert that the getMostPolluted function was called with
      // the correct coordinates
      expect(getMostPollutedSpy).toHaveBeenCalledWith(
        coordinates.latitude,
        coordinates.longitude,
      );
    });
  });
});