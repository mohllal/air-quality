/**
 * Miscellaneous shared functions go here.
 */

/**
 *  Validate if a value is a valid number.
 */
export function isNumber(value?: unknown): boolean {
  return (
    (typeof value === 'number') ||
    ((typeof value === 'string') &&
    (value != '') &&
    (!isNaN(Number(value.toString())))
    )
  );
}

/**
 *  Validate if a value is a valid latitude.
 */
export function isLatitude(latitude: unknown): boolean {
  return (
    isNumber(latitude) &&
    isFinite(Number(latitude)) && 
    Math.abs(Number(latitude)) <= 90
  );
}

/**
 *  Validate if a value is a valid longitude.
 */
export function isLongitude(longitude: unknown): boolean {
  return (
    isNumber(longitude) &&
    isFinite(Number(longitude)) &&
    Math.abs(Number(longitude)) <= 180
  );
}

export default {
  isNumber,
  isLatitude,
  isLongitude,
} as const;