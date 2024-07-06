/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  AirQuality: {
    Base: '/air_quality',
    NearestCity: '/nearest_city',
    ParisMostPolluted: '/paris_most_polluted',
  },
} as const;
