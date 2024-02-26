const { connectToDatabase } = require('./mongoService');
const App = require('../models/appModel');

async function checkDuplicateAppName(name) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const existingApp = await collection.findOne({ name });
    return existingApp !== null;
  } catch (error) {
    console.error('Error checking duplicate app name:', error.message);
    throw error;
  }
}

async function createApp(app) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const result = await collection.insertOne(app);
    return result.ops[0];
  } catch (error) {
    console.error('Error creating app:', error.message);
    throw error;
  }
}

async function getAppByLatestDatetime() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    return await collection.findOne({}, { sort: { datetime: -1 } });
  } catch (error) {
    console.error('Error getting app by latest datetime:', error.message);
    throw error;
  }
}

async function getAllApps() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Error getting all apps:', error.message);
    throw error;
  }
}

async function getAppById(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    return await collection.findOne({ id });
  } catch (error) {
    console.error('Error getting app by ID:', error.message);
    throw error;
  }
}

async function updateAppById(id, updatedApp) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const result = await collection.updateOne({ id }, { $set: updatedApp });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating app by ID:', error.message);
    throw error;
  }
}

async function updateAppByName(name, updatedApp) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const result = await collection.updateOne({ name }, { $set: updatedApp });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating app by name:', error.message);
    throw error;
  }
}

async function deleteAppById(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting app by ID:', error.message);
    throw error;
  }
}

async function deleteAppByName(name) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const result = await collection.deleteOne({ name });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting app by name:', error.message);
    throw error;
  }
}

async function deleteAllApps() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    const result = await collection.deleteMany({});
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting all apps:', error.message);
    throw error;
  }
}

async function getTotalAppCount() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    return await collection.countDocuments({});
  } catch (error) {
    console.error('Error getting total app count:', error.message);
    throw error;
  }
}

module.exports = {
  checkDuplicateAppName,
  createApp,
  getAppByLatestDatetime,
  getAllApps,
  getAppById,
  updateAppById,
  updateAppByName,
  deleteAppById,
  deleteAppByName,
  deleteAllApps,
  getTotalAppCount,
};
