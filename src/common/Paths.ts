/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  AirQuality: {
    Base: '/air_quality',
    NearestCity: '/nearest_city',
  },
} as const;
