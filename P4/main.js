//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const ip = require('ip');


//-- Cargar el módulo de electron
const electron = require('electron');

console.log("Arrancando electron...");

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', ()=>{
  win = new electron.BrowserWindow({
    width:640,
    height:380,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  //win.setMenuBarVisibility(false)
  win.loadFile("index.html")
  win.on('ready-to-show', () => {
    win.webContents.send('ip', 'http://' + ip.address() + ':' + PUERTO);
  });
  electron.ipcMain.handle("button", async(evento, mensaje) => {
    console.log(mensaje);
    io.send("Bienvenido", mensaje);
    win.webContents.send("receive", "Bienvenido");
  }
  );
    console.log("Evento Ready!")
});

const PUERTO = 8080;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido al chat de NERV' + '<p><a href="/Chat.html">¡Entra a chatear!</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
 //-- Si el mensaje comienza con un "/", se interpreta como un comando
 const command = msg.split(":")[1];
 if (command) {
    switch(command) {
      case "/help":
        socket.send("Comandos disponibles: /help, /list, /hello, /date");
        break;
      case "/list":
        socket.send("Usuarios conectados: " + io.engine.clientsCount);
        break;
      case "/hello":
        const user = argument || "desconocido"
        socket.send(`¡Hola ${user}!`);
        break;
      case "/date":
        const date = new Date().toLocaleDateString();
        socket.send("La fecha actual es: " + date);
        break;
      }
  }else if(msg != command){
  //-- Reenviar mensaje a todos los clientes conectados
  io.send(msg);
  win.webContents.send("receive", msg)
}
  });
});




//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);