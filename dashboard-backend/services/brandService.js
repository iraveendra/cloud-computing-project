const { connectToDatabase } = require('./mongoService');
const Brand = require('../models/brandModel');

async function checkDuplicateBrandName(name) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const existingBrand = await collection.findOne({ name });
    return !!existingBrand;
  } catch (error) {
    console.error('Error checking duplicate brand name:', error.message);
    throw error;
  }
}

async function createBrand(brand) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const result = await collection.insertOne(brand);
    return result.ops[0];
  } catch (error) {
    console.error('Error creating brand:', error.message);
    throw error;
  }
}

async function getBrandById(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    return await collection.findOne({ id });
  } catch (error) {
    console.error('Error getting brand by ID:', error.message);
    throw error;
  }
}

async function getAllBrands() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Error getting all brands:', error.message);
    throw error;
  }
}

async function updateBrandById(id, updatedBrand) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const result = await collection.updateOne({ id }, { $set: updatedBrand });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating brand by ID:', error.message);
    throw error;
  }
}

async function updateBrandByName(name, updatedBrand) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const result = await collection.updateOne({ name }, { $set: updatedBrand });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating brand by name:', error.message);
    throw error;
  }
}

async function deleteBrandById(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting brand by ID:', error.message);
    throw error;
  }
}

async function deleteBrandByName(name) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const result = await collection.deleteOne({ name });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting brand by name:', error.message);
    throw error;
  }
}

async function deleteAllBrands() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    const result = await collection.deleteMany({});
    return result.deletedCount;
  } catch (error) {
    console.error('Error deleting all brands:', error.message);
    throw error;
  }
}

async function getTotalBrandCount() {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    return await collection.countDocuments();
  } catch (error) {
    console.error('Error getting total brand count:', error.message);
    throw error;
  }
}

module.exports = {
  checkDuplicateBrandName,
  createBrand,
  getBrandById,
  getAllBrands,
  updateBrandById,
  updateBrandByName,
  deleteBrandById,
  deleteBrandByName,
  deleteAllBrands,
  getTotalBrandCount,
};
