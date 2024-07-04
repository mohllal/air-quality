/**
 * IQAir types
 */

export interface IQAirCityResponse {
  status: string
  data: IQAirCityData
}

export interface IQAirCityData {
  city: string
  state: string
  country: string
  location: IQAirLocation
  current: IQAirCurrent
}

export interface IQAirLocation {
  type: string
  coordinates: number[]
}

export interface IQAirCurrent {
  pollution: IQAirPollution
  weather: IQAirWeather
}

export interface IQAirPollution {
  ts: string
  aqius: number
  mainus: string
  aqicn: number
  maincn: string
}

export interface IQAirWeather {
  ts: string
  tp: number
  pr: number
  hu: number
  ws: number
  wd: number
  ic: string
}
