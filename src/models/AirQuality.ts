import { Schema, model } from 'mongoose';

import {IQAirPollution} from '@src/models/IQAir';

// **** Types **** //

export interface IAirQuality {
  latitude: number;
  longitude: number;
  pollution: IQAirPollution;
  createdAt?: Date;
}

// **** Schemas **** //

const airQualitySchema = new Schema<IAirQuality>({
  latitude: { type: Number, min: -90, max: 90, required: true, index: true },
  longitude: { type: Number, min: -180, max: 180, required: true, index: true },
  pollution: {
    ts: { type: String, required: true },
    aqius: { type: Number, required: true, index: true },
    mainus: { type: String, required: true },
    aqicn: { type: Number, required: true },
    maincn: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

// **** Models **** //

export const AirQuality = model<IAirQuality>('AirQuality', airQualitySchema);
  