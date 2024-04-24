let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Rutas de acceso:
app.get('/', (request, response) => {
    response.send("Ruta de iniciosss");
})



//Encender Servidor

let puerto = 3000;
app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto ' + puerto);
});

