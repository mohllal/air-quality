import { AirQuality, IAirQuality } from '@src/models/AirQuality';
import { clear, connect, disconnect } from 'spec/support/database';

import AirQualityRepo from '@src/repos/AirQualityRepo';
import { IQAirPollution } from '@src/models/IQAir';
import { MongooseError } from 'mongoose';
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

const getDummyAirQuality = (latitude?: number, longitude?: number) => {
  return {
    latitude: latitude ?? faker.location.latitude(),
    longitude: longitude ?? faker.location.longitude(),
    pollution: getDummyPollution(),
  } as IAirQuality;
};

describe('AirQualityRepo', () => {
  beforeAll(async () => {
    await connect();
  });

  describe('getOne', () => {
    it('should return the correct document when given an existing latitude and longitude', async () => {
      // Create dummy air quality document
      const dummyAirQualityDoc = await AirQuality.create(getDummyAirQuality());
      
      // Create AirQuality.findOne method spy
      const findOneSpy = spyOn(AirQuality, 'findOne').and.callThrough();
    
      // Call the getOne function with the coordinates data
      const doc = await AirQualityRepo.getOne(
        dummyAirQualityDoc.latitude,
        dummyAirQualityDoc.longitude,
      );

      // Assert that the getOne function returns the correct data
      expect(doc).toBeDefined();
      expect(doc?.latitude).toEqual(dummyAirQualityDoc.latitude);
      expect(doc?.longitude).toEqual(dummyAirQualityDoc.longitude);
      expect({...doc?.pollution}).toEqual({...dummyAirQualityDoc.pollution});

      // Assert that the AirQuality.findOne method was called with the correct filter
      expect(findOneSpy).toHaveBeenCalledWith({
        latitude: dummyAirQualityDoc.latitude,
        longitude: dummyAirQualityDoc.longitude,
      });
    });

    it('should throw an error when the AirQuality.findOne method fails', async () => {
      // Create AirQuality.findOne method spy
      const findOneSpy = spyOn(AirQuality, 'findOne').and.rejectWith(new MongooseError('Database error!'));
    
      try {
        // Call the getOne function with the coordinates data
        await AirQualityRepo.getOne(10.1, 20.1);
      } catch (error) {
        // Assert that the getOne function throws an error
        expect(error).toBeInstanceOf(MongooseError);
      }

      // Assert that the AirQuality.findOne method was called with the correct filter
      expect(findOneSpy).toHaveBeenCalledWith({
        latitude: 10.1,
        longitude: 20.1,
      });
    });
  });
  
  describe('getAll', () => {
    it('should return all documents in the collection', async () => {
      // Create dummy air quality document
      await AirQuality.create(getDummyAirQuality());

      // Create AirQuality.find method spy
      const findSpy = spyOn(AirQuality, 'find').and.callThrough();
    
      // Call the getAll function to get all air quality documents
      const docs = await AirQualityRepo.getAll();

      // Assert that the AirQuality.find method was called
      expect(findSpy).toHaveBeenCalled();

      // Assert that the getAll function returns the correct data
      expect(docs).toBeDefined();
      expect(docs.length).toEqual(1);
    });

    it('should throw an error when the AirQuality.find method fails', async () => {
      // Create AirQuality.find method spy
      const findSpy = spyOn(AirQuality, 'find').and.rejectWith(new MongooseError('Database error!'));
    
      try {
        // Call the getAll function to get all air quality documents
        await AirQualityRepo.getAll();
      } catch (error) {
        // Assert that the getAll function throws an error
        expect(error).toBeInstanceOf(MongooseError);
      }

      // Assert that the AirQuality.find method was called with the correct filter
      expect(findSpy).toHaveBeenCalled();
    });
  });
  
  describe('getMostPolluted', () => {
    it('should return the most polluted document in the collection', async () => {
      const latitude = 10.1, longitude = 20.1;
    
      // Get dummy air quality data
      const firstDummyAirQuality = getDummyAirQuality(latitude, longitude);
      const secondDummyAirQuality = getDummyAirQuality(latitude, longitude);

      const maxAirQuality =
      firstDummyAirQuality.pollution.aqius > secondDummyAirQuality.pollution.aqius ?
        firstDummyAirQuality : secondDummyAirQuality;

      // Create dummy air quality documents
      await AirQuality.create([firstDummyAirQuality, secondDummyAirQuality]);

      // Create AirQuality.findOne method spy
      const findOneSpy = spyOn(AirQuality, 'findOne').and.callThrough();
    
      // Call the getMostPolluted function to get the most polluted air quality
      const doc = await AirQualityRepo.getMostPolluted(latitude, longitude);

      // Assert that the AirQuality.findOne method was called
      expect(findOneSpy).toHaveBeenCalled();

      // Assert that the getMostPolluted function returns the correct data
      expect(doc).toBeDefined();
      expect(doc?.latitude).toEqual(maxAirQuality.latitude);
      expect(doc?.longitude).toEqual(maxAirQuality.longitude);
      expect({...doc?.pollution}).toEqual({...maxAirQuality.pollution});
    });

    it('should throw an error when the AirQuality.findOne method fails', async () => {
      // Create AirQuality.findOne method spy
      const findOneSpy = spyOn(AirQuality, 'findOne').and.rejectWith(new MongooseError('Database error!'));
    
      try {
        // Call the getMostPolluted function to get the most polluted air quality
        await AirQualityRepo.getMostPolluted(10.1, 20.1);
      } catch (error) {
        // Assert that the getMostPolluted function throws an error
        expect(error).toBeInstanceOf(MongooseError);
      }

      // Assert that the AirQuality.find method was called with the correct filter
      expect(findOneSpy).toHaveBeenCalled();
    });
  });
  
  describe('add', () => {
    it('should add a new document to the collection correctly', async () => {
      // Get dummy air quality data
      const dummyAirQuality = getDummyAirQuality();

      // Create AirQuality.create method spy
      const createSpy = spyOn(AirQuality, 'create').and.callThrough();
  
      // Call the add function to insert air quality document
      await AirQualityRepo.add(dummyAirQuality);

      // Call AirQuality.findOne method to get the inserted document
      const doc = await AirQuality.findOne({ 
        latitude: dummyAirQuality.latitude,
        longitude: dummyAirQuality.longitude,
      });

      // Assert that the add function inserts the correct data
      expect(doc).toBeDefined();
      expect(doc?.latitude).toEqual(dummyAirQuality.latitude);
      expect(doc?.longitude).toEqual(dummyAirQuality.longitude);
      expect({...doc?.pollution}).toEqual({...dummyAirQuality.pollution});
      
      // Assert that the AirQuality.create method was called with the correct data
      expect(createSpy).toHaveBeenCalledWith(dummyAirQuality);
    });

    it('should throw an error when the AirQuality.create method fails', async () => {
      // Get dummy air quality data
      const dummyAirQuality = getDummyAirQuality();
  
      // Create AirQuality.create method spy
      const createSpy = spyOn(AirQuality, 'create').and.rejectWith(new MongooseError('Database error!'));
    
      try {
        // Call the add function with the air quality data
        await AirQualityRepo.add(dummyAirQuality);
      } catch (error) {
        // Assert that the add function throws an error
        expect(error).toBeInstanceOf(MongooseError);
      }

      // Assert that the AirQuality.findOne method was called with the correct filter
      expect(createSpy).toHaveBeenCalledWith(dummyAirQuality);
    });
  });

  afterAll(() => {
    disconnect();
  });

  afterEach(async () => {
    await clear();
  });
});