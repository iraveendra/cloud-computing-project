import { connectToDatabase } from './mongoService.js';
import config from '../config.js'; 

async function checkDuplicateWidgetId(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db(config.dbName);
    const collection = db.collection('widgets');
    const existingWidget = await collection.findOne({ _id: id });
    return existingWidget !== null;
  } catch (error) {
    console.error('Error checking duplicate widget ID:', error.message);
    throw error;
  }
}

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
    const datetime = new Date().toISOString();

    if (widget.id && widget.name && widget.name && widget.description && widget.brand) {
      var widgetData = {
        _id: widget.id,
        name: widget.name,
        description: widget.description,
        brand: widget.brand,
        datetime: datetime
      };
    }

    const result = await collection.insertOne(widgetData);

    const brandId = widgetData.brand;
    const brandCollection = db.collection('brands');
    await brandCollection.updateOne({ _id: brandId }, { $inc: { totalWidgets: 1 } });

    return result;
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
    var _id = id;
    return await collection.findOne({ _id });
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
    const _id = id;

    // Check if the widget with the given ID exists
    const existingWidget = await collection.findOne({ _id });

    if (!existingWidget) {
      return 'not_found'; // Widget not found
    }

    // Exclude _id and name fields from the updatedWidget object
    if (updatedWidget.id) delete updatedWidget.id;
    if (updatedWidget.name) delete updatedWidget.name;

    // Update the widget with the new values
    const result = await collection.updateOne({ _id }, { $set: updatedWidget });

    if (result.modifiedCount > 0) {
      return 'updated'; // Widget updated successfully
    } else {
      return 'not_updated'; // Widget found but not modified
    }
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

    // Check if the widget with the given name exists
    const existingWidget = await collection.findOne({ name });

    if (!existingWidget) {
      return 'not_found'; // Widget not found
    }

    // Exclude _id and name fields from the updatedWidget object
    if (updatedWidget.id) delete updatedWidget.id;
    if (updatedWidget.name) delete updatedWidget.name;

    // Update the widget with the new values
    const result = await collection.updateOne({ name }, { $set: updatedWidget });

    if (result.modifiedCount > 0) {
      return 'updated'; // Widget updated successfully
    } else {
      return 'not_updated'; // Widget found but not modified
    }
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
    var _id = id;
    const result = await collection.deleteOne({ _id });
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

export {
  checkDuplicateWidgetId,
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
