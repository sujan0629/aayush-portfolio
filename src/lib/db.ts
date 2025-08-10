import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env');
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (e) {
    console.error('Connection error', e);
    throw new Error('Could not connect to MongoDB');
  }
}

export default dbConnect;
