const { connectToDatabase } = require('./mongoService');
const Widget = require('../models/widgetModel');
const Brand = require('../models/brandModel');

async function checkDuplicateWidgetName(name) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const existingWidget = await collection.findOne({ name });
    return existingWidget !== null;
  } catch (error) {
    console.error('Error checking duplicate widget name:', error.message);
    throw error;
  }
}

async function createWidget(widget) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const result = await collection.insertOne(widget);

    // Update totalWidgets field for the brand
    const brandId = widget.brand;
    const brandCollection = db.collection('brands');
    await brandCollection.updateOne({ id: brandId }, { $inc: { totalWidgets: 1 } });

    return result.ops[0];
  } catch (error) {
    console.error('Error creating widget:', error.message);
    throw error;
  }
}

async function getWidgetById(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    return await collection.findOne({ id });
  } catch (error) {
    console.error('Error getting widget by ID:', error.message);
    throw error;
  }
}

async function getAllWidgets() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Error getting all widgets:', error.message);
    throw error;
  }
}

async function updateWidgetById(id, updatedWidget) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const result = await collection.updateOne({ id }, { $set: updatedWidget });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating widget by ID:', error.message);
    throw error;
  }
}

async function updateWidgetByName(name, updatedWidget) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const result = await collection.updateOne({ name }, { $set: updatedWidget });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating widget by name:', error.message);
    throw error;
  }
}

async function deleteWidgetById(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting widget by ID:', error.message);
    throw error;
  }
}

async function deleteWidgetByName(name) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const result = await collection.deleteOne({ name });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting widget by name:', error.message);
    throw error;
  }
}

async function deleteAllWidgets() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const result = await collection.deleteMany({});
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting all widgets:', error.message);
    throw error;
  }
}

async function getTotalWidgetCount() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    return await collection.countDocuments({});
  } catch (error) {
    console.error('Error getting total widget count:', error.message);
    throw error;
  }
}

module.exports = {
  checkDuplicateWidgetName,
  createWidget,
  getWidgetById,
  getAllWidgets,
  updateWidgetById,
  updateWidgetByName,
  deleteWidgetById,
  deleteWidgetByName,
  deleteAllWidgets,
  getTotalWidgetCount,
};
