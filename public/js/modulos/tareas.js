import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avances';


const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      const url = `${location.origin}/tareas/${idTarea}`;

      axios
        .patch(url, {
          idTarea,
        })
        .then((response) => {
          if (response.status === 200) {
            icono.classList.toggle("completo");

            actualizarAvance();
          }

          //console.log(response);
        });
    }
    if (e.target.classList.contains("fa-trash")) {
      console.log(e.target);
      const tareaHTML = e.target.parentElement.parentElement,
        idTarea = tareaHTML.dataset.tarea;
      Swal.fire({
        title: "Deseas borrar esta tarea?",
        text: "Una vez eliminada no podra recuperarla",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Si, borrar!",
      }).then((result) => {
        if (result.isConfirmed) {
           const url = `${location.origin}/tareas/${idTarea}`;

           axios.delete(url, {params:{ idTarea }})
            .then(function(respuesta){
              if(respuesta.status=== 200){
                tareaHTML.parentElement.removeChild(tareaHTML);


                Swal.fire(
                  'Tarea Eliminada',
                  respuesta.data,
                  'succes'
                )
                actualizarAvance();
              }
            });
        }
      });
    }
  });
}

export default tareas;
