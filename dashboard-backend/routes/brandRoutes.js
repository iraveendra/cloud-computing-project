const express = require('express');
const router = express.Router();
const {
  checkDuplicateBrandNameController,
  createBrandController,
  getBrandByIdController,
  getAllBrandsController,
  updateBrandByIdController,
  updateBrandByNameController,
  deleteBrandByIdController,
  deleteBrandByNameController,
  deleteAllBrandsController,
  getTotalBrandCountController
} = require('../controllers/brandController');

router.post('/duplicate', checkDuplicateBrandNameController);
router.post('/', createBrandController);
router.get('/:id', getBrandByIdController);
router.get('/', getAllBrandsController);
router.put('/:id', updateBrandByIdController);
router.put('/name/:name', updateBrandByNameController);
router.delete('/:id', deleteBrandByIdController);
router.delete('/name/:name', deleteBrandByNameController);
router.delete('/', deleteAllBrandsController);
router.get('/count', getTotalBrandCountController);

module.exports = router;
