const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product')
const ProductService = require('../services/product')

const {models } = require('../db/sequelize')

class ProductRouter
{
  constructor()
  {
    const productService = new ProductService(models);
    const productController = new ProductController(productService)

    router.get('/', productController.getAllProducts);

    router.post('/', productController.createNewProduct);

    router.patch('/:id', productController.updateProduct);

    router.put('/:id', productController.upsertProduct);

    router.delete('/:id', productController.deleteProduct);
  }

  getRouter()
  {
    return router
  }
}


module.exports = ProductRouter;