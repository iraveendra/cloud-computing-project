import express from 'express';
const router = express.Router();
import {
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
} from '../controllers/appController.js';

router.post('/duplicate', checkDuplicateAppNameController);
router.post('/', createAppController);
router.get('/count', getTotalAppCountController);
router.get('/latest', getAppByLatestDatetimeController);
router.get('/', getAllAppsController);
router.get('/:id', getAppByIdController);
router.put('/:id', updateAppByIdController);
router.put('/name/:name', updateAppByNameController);
router.delete('/:id', deleteAppByIdController);
router.delete('/name/:name', deleteAppByNameController);
router.delete('/', deleteAllAppsController);


export default router;
