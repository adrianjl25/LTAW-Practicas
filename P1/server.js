const http = require('http');
const fs = require('fs');

const PUERTO = 9000;

const server = http.createServer((req, res) => {
  let url = new URL (req.url, 'http://' + req.headers['host']);

  let page = "";

  //Se llama a la página principal por defecto
   if (url.pathname != "/"){
       page += "."+ url.pathname
     } else{
         page += "server.html"
     }

  fs.readFile(page, function(err, data) {

    if (err) {
      // Página de error
      res.writeHead(404, {'Content-Type': 'text/html'});
      return fs.createReadStream('error.html').pipe(res)
    } 

    res.write(data);
    res.end();
  });


});

server.listen(PUERTO);

console.log("¡Abriendo mi tienda!.Escuchando en puerto: " + PUERTO);