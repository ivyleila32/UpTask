const Proyectos = require('../models/Proyectos');


exports.proyectoHome = async(req, res) => {
    const proyectos = await Proyectos.findAll(); 
    res.render('index', {
      nombrePagina :'Proyectos',
      proyectos
    });
}

exports.formularioProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
      nombrePagina: 'Nuevo Proyecto',
      proyectos,
    });
}


exports.nosotros = (req,res) => {
    res.send('nosotros');
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    //enviar lo que el usuario escriba 
    //console.log(req.body);

    //vaidar input 
    const {nombre} = req.body;

    let errores = [];

    if(!nombre) {
      errores.push({'texto': 'Agrega un Nombre al Proyecto'}) 
    }
  

    // errrores
    if (errores.length > 0 ){
        res.render('nuevoProyecto',{
          nombrePagina : 'Nuevo Proyecto',
          errores,
          proyectos
        })
    } else {
      // Si no hay errores
      //  puedo insertar en la base de datos
      
      await Proyectos.create({nombre});
      res.redirect('/');
    }
}
exports.proyectoPorUrl = async(req,res,next) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise =  Proyectos.findOne({
        where: {
          url: req.params.url

        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    if (!proyecto) return next();

    res.render('tareas', {
      nombrePagina : 'tareas del proyecto',
      proyecto,
      proyectos
    })

}
exports.formularioEditar = async(req, res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise =  Proyectos.findOne({
        where: {
          id: req.params.id

        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    //enviar lo que el usuario escriba 
    //console.log(req.body);

    //vaidar input 
    const {nombre} = req.body;

    let errores = [];

    if(!nombre) {
      errores.push({'texto': 'Agrega un Nombre al Proyecto'}) 
    }
 

    // errrores
    if (errores.length > 0 ){
        res.render('nuevoProyecto',{
          nombrePagina : 'Nuevo Proyecto',
          errores,
          proyectos
        })
    } else {
      // Si no hay errores
      //  puedo insertar en la base de datos
      
      await Proyectos.update(
        {nombre: nombre},
        {where: {id: req.params.id}}
        );
      res.redirect('/');
    }
}
