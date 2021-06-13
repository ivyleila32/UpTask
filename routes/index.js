const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const proyectoController = require("../controllers/proyectoController");
const tareasController = require("../controllers/tareasController");

module.exports = function () {
  //ruta para el home
  router.get("/", proyectoController.proyectoHome);
  router.get("/nuevo-proyecto", proyectoController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto
  );

  router.get("/proyectos/:url", proyectoController.proyectoPorUrl);
  // actualiar el proycto
  router.get("/proyecto/editar/:id", proyectoController.formularioEditar);
  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto
  );
  router.delete("/proyectos/:url", proyectoController.eliminarProyecto);

  // Tareas
  router.post('/proyectos/:url', tareasController.agregarTarea);
  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

  return router;
};
