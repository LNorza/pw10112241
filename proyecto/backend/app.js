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

//Conexion a MySQL
let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Invermex2018!',
    database: 'pwdata',
    port: 3306,
});
connection.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('Conexion con base de datos MySQL establecida');
})

//Seleccionar todos los Clientes:
app.get('/api/clientes', (request, response) => {
    const queryData = "SELECT * FROM clientes";
    connection.query(queryData, (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas);
        }
    });
})

//Seleccionar un Cliente por ID:
app.get('/api/clientes/:id', (request, response) => {
    const id = request.params.id;
    const queryData = "SELECT * FROM clientes WHERE id = ?";
    connection.query(queryData, [id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    });
})

//Encender Servidor
let puerto = 3000;
app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto ' + puerto);
});

