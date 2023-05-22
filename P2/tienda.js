const http = require('http');
const fs = require('fs');

var document
// var carlosruper = document.getElementsByClassName('usuariok');

const PUERTO = 9000;
const login = fs.readFileSync('login.html', 'utf-8');
const cesta = fs.readFileSync('cesta.html', 'utf-8');
const productos = fs.readFileSync('productos.json');

// carlosruper.innerHTML= "Bienvenido, ";

const server = http.createServer((req, res) => {
  
  let url = new URL (req.url, 'http://' + req.headers['host']);

  let page = "";

  //Se llama a la página principal por defecto
   if (url.pathname != "/"){
       page += "."+ url.pathname
     } else{
         page += "tienda.html"
     }

//-- Por defecto entregar formulario
let content_type = "text/html";
let content = login;


// var usuario =""
// var contraseña = "" 
// var carlos = url.searchParams.toString();
// usuario = carlos.split("&")[0]
// contraseña = carlos.split("&")[1]
// console.log(usuario)
// console.log(contraseña)
// console.log("Método: " + req.method);
//   console.log("Recurso: " + req.url);
//   console.log("  Ruta: " + url.pathname);
//   console.log("  Parametros: " + url.searchParams)
  // fetch('usuarios.json')
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(myJson) {
  //   console.log(myJson);
  // })
//if (url.pathname == '/procesar') {
//    content_type = "text/html";
//    content = cesta;
//}

//-- Si hay datos en el cuerpo, se imprimen
req.on('data', (cuerpo) => {

  //-- Los datos del cuerpo son caracteres
  req.setEncoding('utf8');
  console.log(`Cuerpo (${cuerpo.length} bytes)`)
  console.log(` ${cuerpo}`);
});

 //-- Leer los parámetros
 //let usuario = url.searchParams.get('usuario');
 //let contraseña = url.searchParams.get('password');
 //console.log(" Usuario: " + usuario);
 //console.log(" Contraseña: " + contraseña);

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