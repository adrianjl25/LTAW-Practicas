//-- Elementos del interfaz
const displays = document.getElementById("displays");
const electron = require('electron');


const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const ip = document.getElementById("ip");
const button = document.getElementById("btn_test");

let users = 'Anónimo';

//-- Crear un websocket. Se establece la conexión con el servidor
//const socket = io();
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();
info4.textContent = process.versions.node;
info5.textContent = process.versions.chrome;
info6.textContent = process.versions.electron;
electron.ipcRenderer.on('ip',(evento,dirip) => {
    ip.innerHTML = dirip + "/Chat.html";
}
);

electron.ipcRenderer.on('receive',(evento,dirip) => {
    displays.innerHTML += dirip + "</p>";
}
);


button.onclick = () => {
    console.log("Botón apretado!");
    electron.ipcRenderer.invoke("button", "Conectando...")
}
