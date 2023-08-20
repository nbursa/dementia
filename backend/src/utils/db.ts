import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined.');
}

let _db: any;

export const connectToDb = async () => {
  if (_db) {
    return _db;
  }

  const client = new MongoClient(MONGO_URI);

  await client.connect();
  _db = client.db(DATABASE_NAME);
  return _db;
};