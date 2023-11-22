const request = require('supertest')
const app = require('../app')
const productData = require('./data/product.data')

jest.mock('../src/services/product', () => {
  const productData = require('./data/product.data');

  return jest.fn().mockImplementation(() => {
    return {
      getProducts: jest.fn().mockResolvedValue(productData),
      saveNewProduct: jest.fn().mockResolvedValue(),
      updateProduct: jest.fn().mockResolvedValue(),
      upsertProduct: jest.fn().mockResolvedValue(),
      deleteProduct: jest.fn().mockResolvedValue()
    }
  })
})

describe('/products Endpoint tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Should return products with status 200', async () => {

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toEqual(productData)
  } )

  it('Should create a new product with status 201', async () => {

    const response = await request(app)
                           .post('/products')
                           .send({
                            "name": "Products Test",
                            "price": "62800",
                            "currency": "COP",
                            "description": "Es el producto de pruebas"
                        });

    expect(response.status).toBe(201);
    //"text/html"
    expect(response.headers['content-type']).toMatch(/text\/html/)
  } )


  it('Should update a product with status 201', async () => {

    const response = await request(app)
                           .patch('/products/123')
                           .send({
                            "name": "Products Test",
                            "price": "62800",
                            "currency": "COP",
                            "description": "Es el producto de pruebas"
                        });

    expect(response.status).toBe(201);
    //"text/html"
    expect(response.headers['content-type']).toMatch(/text\/html/)
  } )

  it('Should upsert a product with status 204', async () => {

    const response = await request(app)
                           .put('/products/123')
                           .send({
                            "name": "Products Test",
                            "price": "62800",
                            "currency": "COP",
                            "description": "Es el producto de pruebas"
                        });

    expect(response.status).toBe(204);
  } )

  it('Should delete a product with status 204', async () => {

    const response = await request(app)
                           .delete('/products/123')
                           .send({
                            "name": "Products Test",
                            "price": "62800",
                            "currency": "COP",
                            "description": "Es el producto de pruebas"
                        });

    expect(response.status).toBe(204);
  } )



})