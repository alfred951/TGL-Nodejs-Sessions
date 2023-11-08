const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo cruel desde Express!')
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

  if(dataJson.isError === true)
  {
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