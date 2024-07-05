/**
 * Test suite database helpers
 */

import EnvVars from '@src/common/EnvVars';
import mongoose from 'mongoose';

// **** Functions **** //

/**
 * Connect to the MongoDB server.
 */
export async function connect(): Promise<void> {
  await mongoose.connect(EnvVars.MONGODB_URL);
}

/**
 * Disconnect from the MongoDB server.
 */
export function disconnect() {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
}

/**
 * Delete all the documents in the database.
 */
export async function clear(): Promise<void> {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

export default {
  connect,
  disconnect,
  clear,
} as const;