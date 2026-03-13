require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance = null;

async function connectDB() {
  try {
    if (dbInstance) {
      return dbInstance;
    }
    await client.connect();

    await client.db('admin').command({ ping: 1 });
    dbInstance = client.db('E-Commerce');
    console.log('Database connection established and STAYING OPEN.');

    return dbInstance;
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
}

exports.connectDB = connectDB;
