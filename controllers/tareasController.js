const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");



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

exports.cambiarEstadoTarea = async (req,res) => {
    const {id} = req.params;
    const tarea = await Tareas.findOne({ where: { id }});

    let estado = 0;
    if (tarea.estado === estado) {
        estado =1;    
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next()

    res.status(200).send('actualizado');
}

exports.eliminarTarea = async (req,res) => {
  const {id} = req.params;

  const resultado = await Tareas.destroy({ where : {id}});

  if(!resultado) return next();

  res.status(200).send('tarea Eliminada correctamente');
}
