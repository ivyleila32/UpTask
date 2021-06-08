exports.proyectoHome = (req, res) => {
    res.render('index', {
      nombrePagina :'proyecto UpTask'
    });
  }

exports.formularioProyecto = (req,res) =>{
    res.render('nuevoProyecto',{
      nombrePagina: 'Nuevo Proyecto'
    });
}


  exports.nosotros = (req,res) => {
    res.send('nosotros');
  }
