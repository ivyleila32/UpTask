import axios from 'axios';
const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, {
                    idTarea,
                })
                .then(response => {
                    console.log(response);
                });
        }
    });
}

export default tareas;