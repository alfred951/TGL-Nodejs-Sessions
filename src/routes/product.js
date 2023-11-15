const express = require('express');
const router = express.Router();
const ProductService = require('../services/product')
const validateProduct = require('../middlewares/productMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const productService = new ProductService();

// Controller or router level middleware
router.use(authMiddleware)

router.get('/', async (req, res) => {
  try {
    const products = await productService.getProducts()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server Error')
  }
});

// Example of an endpoint throwing an unexpected error
router.get('/error', (req, res, next) => {
  const err = new Error('This is a simulated error');
  next(err);
});


// Path level middleware
router.post('/', validateProduct, async (req, res) => {
  try {
    const { name, price, currency, description } = req.body;
    await productService.saveNewProduct(name, price, currency, description)
    res.status(201).send('Product added successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server Error')
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, currency, description } = req.body;
    await productService.updateProduct(productId, name, price, currency, description);
    res.status(201).send('Product updated successfully')

  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server Error')
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, currency, description } = req.body;
    await productService.upsertProduct(productId, name, price, currency, description);

    // if( result === 1){
    //   res.status(204).send()
    // }
    // else {
    //   res.send(201).send()
    // }

    res.status(204).send()

  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server Error')
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
});

module.exports = router;