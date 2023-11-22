
class ProductService {

  constructor(models)
  {
      this.models = models
  }

  async getProducts()
  {
    const products = await this.models.Products.findAll();
    return products
  }

  async saveNewProduct(name, price, currency, description)
  {
    const productCreated = await this.models.Products.create({
      name: name,
      price: price,
      currency: currency,
      description: description
    })

    console.log(productCreated)

  }

  async updateProduct(productId, name, price, currency, description)
  {
    const product = await this.models.Products.findByPk(productId)

    if (!product)
    {
      throw new Error("Product not found")
    }

    await product.update({
      name: name,
      price: price,
      currency: currency,
      description: description
    })

  }

  // update insert 
  async upsertProduct(productId, name, price, currency, description)
  {

    const product = await this.models.Products.findByPk(productId)

    if (!product)
    {
      this.saveNewProduct(name, price, currency, description)
    }

    await product.update({
      name: name,
      price: price,
      currency: currency,
      description: description
    })
  }

  async deleteProduct(productId)
  {
    const prodctToDelete = await this.models.Products.findByPk(productId)
    prodctToDelete.destroy()
    
  }
}

module.exports = ProductService