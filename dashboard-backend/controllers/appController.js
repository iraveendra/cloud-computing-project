import {
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
  } from '../services/appService.js';
  
async function checkDuplicateAppNameController(req, res) {
    try {
      const { name } = req.body;
      const isDuplicate = await checkDuplicateAppName(name);
      res.status(200).json({ status: 'success', data: isDuplicate });
    } catch (error) {
      console.error('Error checking duplicate app name:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function createAppController(req, res) {
    try {
      const app = req.body;
      const isDuplicate = await checkDuplicateAppName(app.name);
      if (isDuplicate) {
        res.status(400).json({ status: 'error', message: 'App name already exists' });
      } else {
        const newApp = await createApp(app);
        res.status(201).json({ status: 'success', data: newApp });
      }
    } catch (error) {
      console.error('Error creating app:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function getAppByLatestDatetimeController(req, res) {
    try {
      const latestApp = await getAppByLatestDatetime();
      res.status(200).json({ status: 'success', data: latestApp });
    } catch (error) {
      console.error('Error getting app by latest datetime:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function getAllAppsController(req, res) {
    try {
      const apps = await getAllApps();
      res.status(200).json({ status: 'success', data: apps });
    } catch (error) {
      console.error('Error getting all apps:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function getAppByIdController(req, res) {
    try {
      const id = req.params.id;
      const app = await getAppById(id);
      if (!app) {
        res.status(404).json({ status: 'error', message: 'App not found' });
      } else {
        res.status(200).json({ status: 'success', data: app });
      }
    } catch (error) {
      console.error('Error getting app by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function updateAppByIdController(req, res) {
    try {
      const id = req.params.id;
      const updatedApp = req.body;
      const result = await updateAppById(id, updatedApp);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'App not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'App updated successfully' });
      }
    } catch (error) {
      console.error('Error updating app by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function updateAppByNameController(req, res) {
    try {
      const name = req.params.name;
      const updatedApp = req.body;
      const result = await updateAppByName(name, updatedApp);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'App not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'App updated successfully' });
      }
    } catch (error) {
      console.error('Error updating app by name:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function deleteAppByIdController(req, res) {
    try {
      const id = req.params.id;
      const result = await deleteAppById(id);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'App not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'App deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting app by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function deleteAppByNameController(req, res) {
    try {
      const name = req.params.name;
      const result = await deleteAppByName(name);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'App not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'App deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting app by name:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function deleteAllAppsController(req, res) {
    try {
      const result = await deleteAllApps();
      res.status(200).json({ status: 'success', message: 'All apps deleted successfully' });
    } catch (error) {
      console.error('Error deleting all apps:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function getTotalAppCountController(req, res) {
    try {
      const totalApps = await getTotalAppCount();
      res.status(200).json({ status: 'success', data: totalApps });
    } catch (error) {
      console.error('Error getting total app count:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
 export {
    checkDuplicateAppNameController,
    createAppController,
    getAppByLatestDatetimeController,
    getAllAppsController,
    getAppByIdController,
    updateAppByIdController,
    updateAppByNameController,
    deleteAppByIdController,
    deleteAppByNameController,
    deleteAllAppsController,
    getTotalAppCountController,
  };
  