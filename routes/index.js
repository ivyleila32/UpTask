const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const proyectoController = require("../controllers/proyectoController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
  //ruta para el home

  router.get(
    "/",
    authController.usuarioAutenticado,
    proyectoController.proyectoHome
  );

  router.get(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    proyectoController.formularioProyecto
  );
  router.post(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto
  );

  router.get(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectoController.proyectoPorUrl
  );
  // actualiar el proycto
  router.get(
    "/proyecto/editar/:id",
    authController.usuarioAutenticado,
    proyectoController.formularioEditar
  );
  router.post(
    "/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto
  );
  router.delete(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectoController.eliminarProyecto
  );

  // Tareas
  router.post("/proyectos/:url", 
  authController.usuarioAutenticado,
  tareasController.agregarTarea);
  router.patch("/tareas/:id",
  authController.usuarioAutenticado,
   tareasController.cambiarEstadoTarea);

  router.delete("/tareas/:id",
   authController.usuarioAutenticado,
   tareasController.eliminarTarea);

  router.get("/crear-cuenta", usuariosController.formCrearCuenta);
  router.post("/crear-cuenta", usuariosController.crearCuenta);
  router.get('/confirmar/:correo',usuariosController.confirmarCuenta);

  router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
  router.post("/iniciar-sesion", authController.autenticarUsuario);

  router.get('cerrar-sesion', authController.cerrarSesion);
  
  router.get('/reestablecer', usuariosController.formReestablecerPassword);
  router.post('/rrestablecer',authController.enviarToken);
  router.get('/reestabecer/:token',authController.validarToken);
  router.post('/reestablecer/:token',authController.actualizarPassword);


  

  return router;
};
