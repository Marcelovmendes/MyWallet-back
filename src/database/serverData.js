import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
} catch (err) {
  console.log(err.message);
}
export const db = mongoClient.db();

/*const mongoClient = new MongoClient('mongodb://localhost:27017/test');
export let db;

mongoClient.connect().then(() => (db = mongoClient.db())); */
