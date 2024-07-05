import AirQualityService, { httpClient } from '@src/services/AirQualityService';

import EnvVars from '@src/common/EnvVars';
import { ICoordinates } from '@src/models/misc';
import { IQAirPollution } from '@src/models/IQAir';

const getDummyPollution = () => {
  return {
    ts: '2024-07-03T20:00:00.000Z',
    aqius: 77,
    mainus: 'p2',
    aqicn: 33,
    maincn: 'p2',
  } as IQAirPollution;
};

const getDummyCoordinates = () => {
  return {
    latitude: 37.7749,
    longitude: -122.4194,
  } as ICoordinates;
};


describe('AirQualityService', () => {
  describe('findByCoordinates', () => {
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
  
      // Call the findByCoordinates function with the coordinates
      const result = await AirQualityService.findByCoordinates(coordinates);
  
      // Assert that the httpClient.get method was called with the correct URL
      expect(getSpy).toHaveBeenCalledWith(
        `/nearest_city?lat=${coordinates.latitude}&lon=${coordinates.longitude}&` + 
        `key=${EnvVars.IQAIR.API_KEY}`,
      );
  
      // Assert that the findByCoordinates function returns the correct data
      expect(result).toEqual(pollution);
    });
  
    it('should throw an error when the httpClient.get method fails', async () => {
      // Get dummy coordinates data
      const coordinates = getDummyCoordinates();
  
      // Create httpClient.get method spy
      const getSpy = 
        spyOn(httpClient, 'get')
          .and.rejectWith(new Error('Network error!'));
  
      try {
        // Call the findByCoordinates function with the coordinates
        await AirQualityService.findByCoordinates(coordinates);
      } catch (error) {
        // Assert that the findByCoordinates function
        expect(error).toBeInstanceOf(Error);
      }
  
      // Assert that the httpClient.get method was called with the correct URL
      expect(getSpy).toHaveBeenCalledWith(
        `/nearest_city?lat=${coordinates.latitude}&lon=${coordinates.longitude}&` +
        `key=${EnvVars.IQAIR.API_KEY}`,
      );
    });
  });
});