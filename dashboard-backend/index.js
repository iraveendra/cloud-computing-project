const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');
const swaggerDocument = require('./swagger.json'); // Path to Swagger JSON file

const { connectToDatabase } = require('./services/mongoService');
const brandRoutes = require('./routes/brandRoutes');
const widgetRoutes = require('./routes/widgetRoutes');
const appRoutes = require('./routes/appRoutes');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization
const initDatabase = async () => {
  try {
    const client = await connectToDatabase();
    const adminDb = client.db().admin();
    const databaseList = await adminDb.listDatabases();
    const isDatabaseExist = databaseList.databases.some(db => db.name === config.dbName);

    if (!isDatabaseExist) {
      console.log(`Database "${config.dbName}" not found. Creating...`);
      await client.db(config.dbName).createCollection('brands');
      await client.db(config.dbName).createCollection('widgets');
      await client.db(config.dbName).createCollection('apps');
      console.log('Collections created successfully.');
    } else {
      console.log('Database already exists.');
    }
  } catch (error) {
    console.error('Error initializing database:', error.message);
    throw error;
  }
};

// Initialize the database
initDatabase();

// Routes
app.use('/brands', brandRoutes);
app.use('/widgets', widgetRoutes);
app.use('/apps', appRoutes);

// Other configurations and error handling
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
