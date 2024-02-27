import { connectToDatabase } from './mongoService.js';
import config from '../config.js'; 

async function checkDuplicateBrandName(brand) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('brands');
    if (brand.name) {
        var name =  brand.name;
    }
    const existingBrand = await collection.findOne({ name });
    return !!existingBrand;
  } catch (error) {
    console.error('Error checking duplicate brand name:', error.message);
    throw error;
  }
}

async function createBrand(brand) {
    try {
      // Connect to the database
      const client = await connectToDatabase();
      const db = client.db(config.dbName);
  
      // Create or access the 'brands' collection
      const collection = db.collection('brands');

      // Generating ID and datetime
      const id = String(Math.floor(Math.random() * 1000000)); // Generating a random number for ID
      const datetime = new Date().toISOString(); // Generating current datetime
  
      // Update name and totalProducts fields if they are present
      if (brand.name) {
        brand.name = brand.name;
      }
      if (brand.totalProducts) {
        brand.totalProducts = Number(brand.totalProducts);
      }
  
      // Adding id, datetime, and initial value for totalProducts if not present
      brand._id = id;
      brand.datetime = datetime;
      brand.totalProducts = brand.totalProducts || 0; // Initial value for totalProducts
      brand.totalWidgets = 0; // Initial value for totalWidgets

      // Insert the brand into the collection
      const result = await collection.insertOne(brand);
      // Return the inserted brand
      return result;
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
    var _id = id;
    return await collection.findOne({ _id });
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
    
        // Check if the brand with the given ID exists
        const existingBrand = await collection.findOne({ _id: id });
    
        if (!existingBrand) {
            return 'not_found'; // Brand not found
        }

        // Exclude _id and name fields from the updatedBrand object
        if (updatedBrand.id) delete updatedBrand.id;
        if (updatedBrand.name) delete updatedBrand.name;
    
        // Update the brand with the new values
        const result = await collection.updateOne({ _id: id }, { $set: updatedBrand });
    
        if (result.modifiedCount > 0) {
            return 'updated'; // Brand updated successfully
        } else {
            return 'not_updated'; // Brand found but not modified
        }
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
  
      // Check if the brand with the given name exists
      const existingBrand = await collection.findOne({ name });
  
      if (!existingBrand) {
        return 'not_found'; // Brand not found
      }

      // Exclude _id and name fields from the updatedBrand object
      if (updatedBrand.id) delete updatedBrand.id;
      if (updatedBrand.name) delete updatedBrand.name;
  
      // Update the brand with the new values
      const result = await collection.updateOne({ name }, { $set: updatedBrand });
  
      if (result.modifiedCount > 0) {
        return 'updated'; // Brand updated successfully
      } else {
        return 'not_updated'; // Brand found but not modified
      }
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
    var _id = id;
    const result = await collection.deleteOne({ _id });
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

export {
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
