import express from 'express';
const router = express.Router();
import {
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
} from '../controllers/widgetController.js';

router.post('/duplicate', checkDuplicateWidgetNameController);
router.post('/', createWidgetController);
router.get('/:id', getWidgetByIdController);
router.get('/', getAllWidgetsController);
router.put('/:id', updateWidgetByIdController);
router.put('/name/:name', updateWidgetByNameController);
router.delete('/:id', deleteWidgetByIdController);
router.delete('/name/:name', deleteWidgetByNameController);
router.delete('/', deleteAllWidgetsController);
router.get('/count', getTotalWidgetCountController);

export default router;