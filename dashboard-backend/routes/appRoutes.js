const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/appController');

router.post('/duplicate', checkDuplicateAppNameController);
router.post('/', createAppController);
router.get('/latest', getAppByLatestDatetimeController);
router.get('/', getAllAppsController);
router.get('/:id', getAppByIdController);
router.put('/:id', updateAppByIdController);
router.put('/name/:name', updateAppByNameController);
router.delete('/:id', deleteAppByIdController);
router.delete('/name/:name', deleteAppByNameController);
router.delete('/', deleteAllAppsController);
router.get('/count', getTotalAppCountController);

module.exports = router;
