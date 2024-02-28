import { connectToDatabase } from './mongoService.js';
import config from '../config.js'; 

async function checkDuplicateAppName(app) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('apps');
    if (app.name) {
        var name =  app.name;
    }
    const existingApp = await collection.findOne({ name });
    return !!existingApp;
  } catch (error) {
    console.error('Error checking duplicate app name:', error.message);
    throw error;
  }
}

async function createApp(app) {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db(config.dbName);

    // Create or access the 'apps' collection
    const collection = db.collection('apps');

    // Generating ID and datetime
    const id = String(Math.floor(Math.random() * 1000000)); // Generating a random number for ID
    const datetime = new Date().toISOString(); // Generating current datetime

    // Update name and totalProducts fields if they are present
    if (app.name && app.description && app.widgets) {
      var appData = {
          _id : id,
          name : app.name,
          description: app.description,
          widgets: app.widgets,
          datetime: datetime
      }
    }

    // Insert the app into the collection
    const result = await collection.insertOne(appData);
    // Return the inserted app
    return result;
  } catch (error) {
    console.error('Error creating brand:', error.message);
    throw error;
  }
}

async function getAppByLatestDatetime() {
  try {
    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db(config.dbName);

    // Find the 'apps' collection and get the latest app
    const collection = db.collection('apps');
    let latestApp = await collection.findOne({}, { sort: { datetime: -1 } });

    // Check if the latest app and its widgets exist
    if (latestApp && latestApp.widgets && latestApp.widgets.length > 0) {
      // Get the widget objects from the 'widgets' collection based on their IDs
      const widgetIds = latestApp.widgets;
      const widgetObjects = await db.collection('widgets').find({ _id: { $in: widgetIds } }).toArray();

      // Extract unique brand IDs from the widget objects
      const brandIds = Array.from(new Set(widgetObjects.map(widget => widget.brandId)));

      // Get the brand objects from the 'brands' collection based on their IDs
      const brandObjects = await db.collection('brands').find({ _id: { $in: brandIds } }).toArray();

      // Update the widgets array in the latest app with brand information
      const updatedWidgets = latestApp.widgets.map(widgetId => {
        const widgetObject = widgetObjects.find(obj => obj._id === widgetId);
        const brandObject = brandObjects.find(obj => obj._id === widgetObject.brandId);
        return { ...widgetObject, brand: brandObject };
      });

      // Update the latest app object with the updated widgets array
      latestApp = { ...latestApp, widgets: updatedWidgets };
    }

    // Return the latest app with updated widget information
    return latestApp;
  } catch (error) {
    // Handle errors
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
    var _id = id;
    return await collection.findOne({ _id });
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
    const _id = id;

    // Check if the app with the given ID exists
    const existingApp = await collection.findOne({ _id });

    if (!existingApp) {
      return 'not_found'; // App not found
    }

    // Exclude _id and name fields from the updatedApp object
    if (updatedApp.id) delete updatedApp.id;
    if (updatedApp.name) delete updatedApp.name;

    // Update the app with the new values
    const result = await collection.updateOne({ _id }, { $set: updatedApp });

    if (result.modifiedCount > 0) {
      return 'updated'; // App updated successfully
    } else {
      return 'not_updated'; // App found but not modified
    }
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

    // Check if the app with the given name exists
    const existingApp = await collection.findOne({ name });

    if (!existingApp) {
      return 'not_found'; // App not found
    }    
    
    // Exclude _id and name fields from the updatedApp object
    if (updatedApp.id) delete updatedApp.id;
    if (updatedApp.name) delete updatedApp.name; 

    // Update the app with the new values
    const result = await collection.updateOne({ name }, { $set: updatedApp });

    if (result.modifiedCount > 0) {
      return 'updated'; // App updated successfully
    } else {
      return 'not_updated'; // App found but not modified
    }
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
    var _id = id;
    const result = await collection.deleteOne({ _id });
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

export {
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
