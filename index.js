const express = require('express');
require('dotenv').config(); // Configuracion de variables de entorno 
const cors = require('cors');
const {dbConnection} = require('./database/config');

// Creacion de servidor - aplicacion en express
const app = express();

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json()); // Middleware para parsear el body

// Rutas
// TODO: auth // authRoutes // crear // login // renew -> renovacion del token
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});