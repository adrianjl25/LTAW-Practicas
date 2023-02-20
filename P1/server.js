const http = require('http');
const fs = require('fs');

const PUERTO = 8080;

const data = fs.readFileSync('server.html','utf8');


const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader('Content-Type','text/html');
    res.write(data);
    res.end();
});

server.listen(PUERTO);

console.log("¡Servidor de Ruman's Food!. Escuchando en puerto: " + PUERTO);