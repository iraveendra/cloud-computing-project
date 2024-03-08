import { MongoClient } from 'mongodb';
import config from '../config.js';

const uri = 'mongodb://' + config.mongo.ip + config.mongo.port;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

export { connectToDatabase }; // Change export syntax to ES module
