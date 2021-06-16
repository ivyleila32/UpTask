const express = require("express");
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('dotenv').config({path: 'variables.env' })


// helpers

const helpers = require('./helpers');


// conectamos a la bd 
const db = require('./config/db');


// importante importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');


db.sync()
    .then(()=> console.log('conectado al servidor'))
    .catch(error => console.log(error));

// crear app de express
const app = express();

//donde cargar los archivos estaticos 
app.use(express.static('public'));

// habilitar pug 
app.set('view engine','pug');

//habilitar bodyparser para leer
app.use(bodyParser.urlencoded({extended: true}));


//app.use(expressValidator());

// añadir la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'));

app.use(flash());

app.use(cookieParser());

app.use(session({
    secret : 'supersecreto',
    resave : false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});



app.use('/', routes() );

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host, () =>{
    console.log('el servidor esta funcionando');
});

