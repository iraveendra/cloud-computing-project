import {
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
  } from '../services/widgetService.js';

async function checkDuplicateWidgetNameController(req, res) {
  try {
    const isDuplicateName = await checkDuplicateWidgetName(req.body.name);
    const isDuplicateId = await checkDuplicateWidgetId(req.body.id);
    res.status(200).json({ status: 'success', data: { isDuplicateName, isDuplicateId } });
  } catch (error) {
    console.error('Error checking duplicate widget:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

async function createWidgetController(req, res) {
  try {
    const isDuplicateName = await checkDuplicateWidgetName(req.body.name);
    const isDuplicateId = await checkDuplicateWidgetId(req.body.id);
    
    if (isDuplicateName) {
      res.status(400).json({ status: 'error', message: 'Widget name already exists' });
    } else if (isDuplicateId) {
      res.status(400).json({ status: 'error', message: 'Widget ID already exists' });
    } else {
      const newWidget = await createWidget(req.body);
      res.status(201).json({ status: 'success', data: newWidget });
    }
  } catch (error) {
    console.error('Error creating widget:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

  
async function getWidgetByIdController(req, res) {
    try {
      const id = req.params.id;
      const widget = await getWidgetById(id);
      if (!widget) {
        res.status(404).json({ status: 'error', message: 'Widget not found' });
      } else {
        res.status(200).json({ status: 'success', data: widget });
      }
    } catch (error) {
      console.error('Error getting widget by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
async function getAllWidgetsController(req, res) {
    try {
      const widgets = await getAllWidgets();
      res.status(200).json({ status: 'success', data: widgets });
    } catch (error) {
        console.error('Error getting all widgets:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
    
    async function updateWidgetByIdController(req, res) {
      try {
        const id = req.params.id;
        const updatedWidget = req.body;
        const result = await updateWidgetById(id, updatedWidget);
    
        if (result === 'not_found') {
          res.status(404).json({ status: 'error', message: 'Widget not found' });
        } else if (result === 'updated') {
          res.status(200).json({ status: 'success', message: 'Widget updated successfully' });
        } else if (result === 'not_updated') {
          res.status(200).json({ status: 'success', message: 'Widget found but not modified' });
        }
      } catch (error) {
        console.error('Error updating widget by ID:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }

    async function updateWidgetByNameController(req, res) {
      try {
        const name = req.params.name;
        const updatedWidget = req.body;
    
        const result = await updateWidgetByName(name, updatedWidget);
    
        if (result === 'not_found') {
          res.status(404).json({ status: 'error', message: 'Widget not found' });
        } else if (result === 'updated') {
          res.status(200).json({ status: 'success', message: 'Widget updated successfully' });
        } else if (result === 'not_updated') {
          res.status(200).json({ status: 'success', message: 'Widget found but not modified' });
        }
      } catch (error) {
        console.error('Error updating widget by name:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
    
  async function deleteWidgetByIdController(req, res) {
      try {
        const id = req.params.id;
        const result = await deleteWidgetById(id);
        if (!result) {
          res.status(404).json({ status: 'error', message: 'Widget not found' });
        } else {
          res.status(200).json({ status: 'success', message: 'Widget deleted successfully' });
        }
      } catch (error) {
        console.error('Error deleting widget by ID:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
    
  async function deleteWidgetByNameController(req, res) {
      try {
        const name = req.params.name;
        const result = await deleteWidgetByName(name);
        if (!result) {
          res.status(404).json({ status: 'error', message: 'Widget not found' });
        } else {
          res.status(200).json({ status: 'success', message: 'Widget deleted successfully' });
        }
      } catch (error) {
        console.error('Error deleting widget by name:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
    
  async function deleteAllWidgetsController(req, res) {
      try {
        const result = await deleteAllWidgets();
        res.status(200).json({ status: 'success', message: 'All widgets deleted successfully' });
      } catch (error) {
        console.error('Error deleting all widgets:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
    
  async function getTotalWidgetCountController(req, res) {
      try {
        const totalWidgets = await getTotalWidgetCount();
        res.status(200).json({ status: 'success', data: totalWidgets });
      } catch (error) {
        console.error('Error getting total widget count:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    }
    
    export {
      checkDuplicateWidgetNameController,
      createWidgetController,
      getWidgetByIdController,
      getAllWidgetsController,
      updateWidgetByIdController,
      updateWidgetByNameController,
      deleteWidgetByIdController,
      deleteWidgetByNameController,
      deleteAllWidgetsController,
      getTotalWidgetCountController,
    };
      