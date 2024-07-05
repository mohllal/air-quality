import { isLatitude, isLongitude, isNumber } from '@src/utils/misc';

describe('Utils', () => {
  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('1')).toBe(true);
      expect(isNumber('1.1')).toBe(true);
    });
  
    it('should return false for non-numbers', () => {
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber('')).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber({})).toBe(false);
    });
  });

  describe('isLatitude', () => {
    it('should return true for valid latitudes', () => {
      expect(isLatitude(0)).toBe(true);
      expect(isLatitude(1.0)).toBe(true);
      expect(isLatitude(90)).toBe(true);
      expect(isLatitude(-90)).toBe(true);
    });
  
    it('should return false for invalid latitudes', () => {
      expect(isLatitude(100)).toBe(false);
      expect(isLatitude(-100)).toBe(false);
      expect(isLatitude(Infinity)).toBe(false);
    });
  });

  describe('isLongitude', () => {
    it('should return true for valid longitudes', () => {
      expect(isLongitude(0)).toBe(true);
      expect(isLatitude(1.0)).toBe(true);
      expect(isLongitude(180)).toBe(true);
      expect(isLongitude(-180)).toBe(true);
    });
  
    it('should return false for invalid longitudes', () => {
      expect(isLongitude(200)).toBe(false);
      expect(isLongitude(-200)).toBe(false);
      expect(isLongitude(Infinity)).toBe(false);
    });
  });
});