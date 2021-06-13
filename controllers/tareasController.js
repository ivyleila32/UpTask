const Proyectos = require("../models/proyectos");
const Tareas = require("../models/tareas");



exports.agregarTarea = async (req, res,next) => {
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

  const {tarea} = req.body;

  const estado = 0;

  const proyectoId = proyecto.id;

  const resultado = Tareas.create({tarea, estado, proyectoId});

  if(!resultado){
     return next(); 
  }
  res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = (req,res) => {
    res.send('todo bien');
}
