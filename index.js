const express = require('express')
const { Pool } = require('pg');
const config = require('./config/db_config');
const app = express()
const port = 3000

const pool = new Pool(config);

app.use(express.json())

app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT $1::text as message', ['Hola mundo cruel desde postgress']);
    const message = result.rows[0].message;
    res.send(message)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno')
  } finally {
    client.release();
  }
});

app.get('/products', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM "PRODUCTS"');
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno')
  } finally {
    client.release();
  }
});

app.post('/products', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, price, currency, description } = req.body;
    await client.query('INSERT INTO "PRODUCTS" (NAME, PRICE, CURRENCY, DESCRIPTION) VALUES($1, $2, $3, $4)', [name, price, currency, description]);
    res.status(201).send('Product added successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno')
  } finally {
    client.release();
  }
});

app.patch('/products/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    const productId = req.params.id;
    const { name, price, currency, description } = req.body;
    const result = await client.query('UPDATE "PRODUCTS" SET name = $1, price = $2, currency = $3, description = $4 WHERE id = $5', [name, price, currency, description, productId]);
    if (result.rowCount === 1) {
      res.status(201).send('Product updated successfully')
    } else if (result.rowCount === 0) {
      res.status(404).send(`Product with id:${productId} was not found`)
    } else {
      res.status(500).send('Error interno')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno')
  } finally {
    client.release();
  }
});

app.put('/products/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    const productId = req.params.id;
    const { name, price, currency, description } = req.body;
    const result = await client.query('UPDATE "PRODUCTS" SET name = $1, price = $2, currency = $3, description = $4 WHERE id = $5', [name, price, currency, description, productId]);
    if (result.rowCount === 1) {
      res.status(200).send('Product updated successfully')
    } else if (result.rowCount === 0) {
      await client.query('INSERT INTO "PRODUCTS" (ID, NAME, PRICE, CURRENCY, DESCRIPTION) VALUES($1, $2, $3, $4, $5)', [productId, name, price, currency, description]);
      res.status(201).send('Product not found, created successfully')
    } else {
      res.status(500).send('Error interno')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno')
  } finally {
    client.release();
  }
});

app.delete('/products/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    const productId = req.params.id;
    const result = await client.query('DELETE FROM "PRODUCTS" WHERE id = $1', [productId]);
    if (result.rowCount === 1) {
      res.status(200).send('Product deleted successfully')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno')
  } finally {
    client.release();
  }
});

app.get('/api/data', (req, res) => {
  res.json(
    {
      timestamp: new Date(),
      message: "Esta es mi data"
    }
  )
});

// path param
app.get('/api/data/:dataId', (req, res) => {
  const dataId = req.params.dataId;
  const header = req.get('Top-Header')
  const cookieValue = req.cookies.myCookie;
  res.json(
    {
      data: dataId,
      timestamp: new Date(),
      myHeader: header,
      message: "Este es mi detalle de ejemplo"
    }
  )
});

// Query param
app.get('/api/search', (req, res) => {
  const { word, product } = req.query;
  res.json(
    {
      word: word,
      product: product,
      timestamp: new Date(),
      message: "Esta es una busqueda de ejemplo"
    }
  )
});

app.get('/info', (req, res) => {
  const data = {
    message: 'Esta es informacion de pruebas',
    timestamp: new Date()
  }

  res.json(data)
});

app.get('/about', (req, res) => {
  // res.send('Esta pagina es sobre Top Gun Lab NodeJs')
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const dataJson = req.body;

  if (dataJson.isError === true) {
    res.status(500)
    res.send({
      message: "Intenta mas tarde"
    })
  }
  else if (dataJson.isDuplicate === true) {
    res.status(409)
    res.send({
      message: "El recurso ya existe"
    })
  } else {
    res.status(201)
    res.send(dataJson)
  }

});

app.put('/', (req, res) => {
  res.send('PUT endpoint')
});

app.patch('/', (req, res) => {
  res.send('PATCH endpoint')
});

app.delete('/', (req, res) => {
  res.send('DELETE endpoint')
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});