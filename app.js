// Cargar tareas guardadas al iniciar
document.addEventListener('DOMContentLoaded', cargarTareas);

function agregarTarea() {
    const input = document.getElementById('nuevaTarea');
    const categoria = document.getElementById('categoria').value;
    const fecha = document.getElementById('recordatorio').value;
    
    const tareaTexto = input.value.trim();

    if (tareaTexto === '') return alert('Escribe una tarea');

    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const nuevaTarea = { texto: tareaTexto, categoria, fecha };

    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));

    input.value = '';
    cargarTareas();
}

function cargarTareas() {
    const lista = document.getElementById('listaTareas');
    lista.innerHTML = '';

    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarea.texto} | <strong>${tarea.categoria}</strong> | 📅 ${tarea.fecha}</span>
            <button class="delete-btn" onclick="eliminarTarea(${index})">❌</button>
        `;
        lista.appendChild(li);
    });
}

function eliminarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    cargarTareas();
}
