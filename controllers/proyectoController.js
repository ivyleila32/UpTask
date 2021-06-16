const Proyectos = require("../models/Proyectos");
const Tareas = require('../models/Tareas');

exports.proyectoHome = async (req, res) => {
  const usuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({where: {usuarioId}});
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({where: {usuarioId}});
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

exports.nosotros = (req, res) => {
  res.send("nosotros");
};

exports.nuevoProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({where: {usuarioId}});
  //enviar lo que el usuario escriba
  //console.log(req.body);

  //vaidar input
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un Nombre al Proyecto" });
  }

  // errrores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    // Si no hay errores
    //  puedo insertar en la base de datos
    const usuarioId = res.locals.usuario.id;
    await Proyectos.create({ nombre, usuarioId });
    res.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const usuarioId = res.locals.usuario.id;

  const proyectosPromise = Proyectos.findAll({where: {usuarioId}});

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
      usuarioId

    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  const tareas = await Tareas.findAll({
    where: {
      proyectoId : proyecto.id
    }
    
  });
  console.log(tareas);
  if (!proyecto) return next();

  res.render("tareas", {
    nombrePagina: "tareas del proyecto",
    proyecto,
    proyectos,
    tareas,
  });
};

exports.formularioEditar = async (req, res) => {
  const usuarioId = res.locals.usuario.id;

  const proyectosPromise = Proyectos.findAll({where: {usuarioId}});
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
      usuarioId
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
  
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where: {usuarioId}});
  //enviar lo que el usuario escriba
  //console.log(req.body);

  //vaidar input
  const nombre  = req.body.nombre;

  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un Nombre al Proyecto" });
  }

  // errrores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    // Si no hay errores
    //  puedo insertar en la base de datos

    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  //console.log(req.params);
  const {urlProyecto} = req.query;
  const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });
  if (!resultado) {
    return next();
  }
  res.status(200).send("proyecto eliminado correctamente");
}


