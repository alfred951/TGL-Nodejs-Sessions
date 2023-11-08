const http = require('node:http');
const { readFileSync } = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

const homePage = readFileSync('./index.html')

const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    if(req.url === '/')
    {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write(homePage)
      res.end();
    }
    else if (req.url === '/about')
    {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write('<h1>Esta pagina es sobre mi</h1>')
      res.end();  
    }
    else
    {
      res.writeHead(404, { 'content-type': 'text/html' })
      res.write('<h1>page not found</h1>')
      res.end();  
    }
    
  }
  else
  {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Adios mundo cruel!\n');  
  }

  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});