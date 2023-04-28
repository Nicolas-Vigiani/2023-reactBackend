// importar express de esta manera (linea de abajo)
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//console.log(process.env); asi se ve todas las variables de entorno corriendo y dentro esta el puerto

//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())

//Directorio Publico (lo muestro cuando la persona entra a la pagina, es decir el index.html)
app.use(express.static('public')); // el use es un middleware, que no es mas que una funcion que se ejecuta cada vez que se hace una peticion
// en el use se indica (el path de la carpeta o el nombre del directorio, por lo general public)

//Lectura y parseo del body
app.use(express.json()); //cada vez que uso el use estoy usando un middleware


//!RUTAS
app.use('/api/auth', require('./routes/auth')); // este path se concatena con el que declaro en auth, cuando quiero llamar hago localhost:4000/api/auth/...
// CRUD: Eventos
app.use('/api/events', require('./routes/events'));

//! esto es para que ande en railway o heroku es un comodin para que no sea cualquiera de las rutas anteriores vaya al archivo index
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
})
//! aqui termina esta parte que debo copiar y pegar para que ande en railway video corregir ruta en express


//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});

