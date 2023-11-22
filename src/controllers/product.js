
class ProductController {
  constructor(productService)
  {
    this.productService = productService
  }

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getProducts()
      res.json(products)
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server Error')
    }
  }

  createNewProduct = async (req, res) => {
    try {
      const { name, price, currency, description } = req.body;
      await this.productService.saveNewProduct(name, price, currency, description)
      res.status(201).send('Product added successfully')
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server Error')
    }
  }

  updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, currency, description } = req.body;
      await this.productService.updateProduct(productId, name, price, currency, description );
      res.status(201).send('Product updated successfully')
  
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server Error')
    } 
  }

  upsertProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, currency, description } = req.body;
      await this.productService.upsertProduct(productId, name, price, currency, description);
      res.status(204).send()
  
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal server Error')
    } 
  }

  deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      await this.productService.deleteProduct(productId)
      res.status(204).send()
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal Server Error')
    } 
  }
}

module.exports = ProductController