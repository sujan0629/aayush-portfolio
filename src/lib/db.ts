import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env');
}

/**
 * Connects to the MongoDB database.
 * This function is designed to work in serverless environments.
 */
async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (e) {
    console.error('Connection error', e);
    throw new Error('Connection error');
  }
}

export default dbConnect;
