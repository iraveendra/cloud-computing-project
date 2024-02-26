const {
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
  } = require('../services/brandService');

  async function checkDuplicateBrandNameController(req, res) {
    try {
      const { name } = req.body;
      const isDuplicate = await checkDuplicateBrandName(name);
      res.status(200).json({ status: 'success', data: isDuplicate });
    } catch (error) {
      console.error('Error checking duplicate brand name:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function createBrandController(req, res) {
    try {
      const { name, totalWidgets, totalProducts } = req.body;
      const isDuplicate = await checkDuplicateBrandName(name);
      if (isDuplicate) {
        res.status(400).json({ status: 'error', message: 'Brand name already exists' });
      } else {
        const newBrand = await createBrand(name, totalWidgets, totalProducts);
        res.status(201).json({ status: 'success', data: newBrand });
      }
    } catch (error) {
      console.error('Error creating brand:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function getBrandByIdController(req, res) {
    try {
      const id = req.params.id;
      const brand = await getBrandById(id);
      if (!brand) {
        res.status(404).json({ status: 'error', message: 'Brand not found' });
      } else {
        res.status(200).json({ status: 'success', data: brand });
      }
    } catch (error) {
      console.error('Error getting brand by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function getAllBrandsController(req, res) {
    try {
      const brands = await getAllBrands();
      res.status(200).json({ status: 'success', data: brands });
    } catch (error) {
      console.error('Error getting all brands:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function updateBrandByIdController(req, res) {
    try {
      const id = req.params.id;
      const updatedBrand = req.body;
      const result = await updateBrandById(id, updatedBrand);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'Brand not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'Brand updated successfully' });
      }
    } catch (error) {
      console.error('Error updating brand by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function updateBrandByNameController(req, res) {
    try {
      const name = req.params.name;
      const updatedBrand = req.body;
      const result = await updateBrandByName(name, updatedBrand);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'Brand not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'Brand updated successfully' });
      }
    } catch (error) {
      console.error('Error updating brand by name:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function deleteBrandByIdController(req, res) {
    try {
      const id = req.params.id;
      const result = await deleteBrandById(id);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'Brand not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'Brand deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting brand by ID:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function deleteBrandByNameController(req, res) {
    try {
      const name = req.params.name;
      const result = await deleteBrandByName(name);
      if (!result) {
        res.status(404).json({ status: 'error', message: 'Brand not found' });
      } else {
        res.status(200).json({ status: 'success', message: 'Brand deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting brand by name:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function deleteAllBrandsController(req, res) {
    try {
      const result = await deleteAllBrands();
      res.status(200).json({ status: 'success', message: 'All brands deleted successfully' });
    } catch (error) {
      console.error('Error deleting all brands:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  async function getTotalBrandCountController(req, res) {
    try {
      const totalBrands = await getTotalBrandCount();
      res.status(200).json({ status: 'success', data: totalBrands });
    } catch (error) {
      console.error('Error getting total brand count:', error.message);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    checkDuplicateBrandNameController,
    createBrandController,
    getBrandByIdController,
    getAllBrandsController,
    updateBrandByIdController,
    updateBrandByNameController,
    deleteBrandByIdController,
    deleteBrandByNameController,
    deleteAllBrandsController,
    getTotalBrandCountController,
  };
  