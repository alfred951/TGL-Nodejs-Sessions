const { Product, ProductSchema } = require('./models/product')

function setupModels(sequelize) {
  Product.init(ProductSchema, Product.config(sequelize))

  //Relaciones 1 a 1 - 1 a muchos - muchos a muchos 
}

module.exports = setupModels