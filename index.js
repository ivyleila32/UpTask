const express = require("express");
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// helpers

const helpers = require('./helpers');


// conectamos a la bd 
const db = require('./config/db');

// importante importar el modelo
require('./models/proyectos');

db.sync()
    .then(()=> console.log('conectado al servidor'))
    .catch(error => console.log(error));

// crear app de express
const app = express();
//habilitar bodyparser para leer
app.use(bodyParser.urlencoded({extended: true}));

//donde cargar los archivos estaticos 
app.use(express.static('public'));

// habilitar pug 
app.set('view engine','pug');

// añadir la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'));

app.use((req,res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});



app.use('/', routes());

app.listen(3000);
