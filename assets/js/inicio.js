const patientList = document.getElementById('patient-list');
const modal = document.getElementById('difficulty-modal');

async function inicializarPagina() {
    try {
        const response = await fetch('http://localhost:3000/api/pacientes');
        const pacientes = await response.json();

        pacientes.forEach(paciente => {
            const row = document.createElement('div');
            row.classList.add('row');

            const img = document.createElement('img');
            img.src = "../assets/img/usuario.png";
            img.alt = "Paciente";
            img.classList.add('usuario-image');

            const info = document.createElement('div');
            info.classList.add('word');
            info.textContent = `${paciente.nombre} ${paciente.apellido} (Edad: ${paciente.edad})`;

            // Botón de historial
            const historialButton = document.createElement('button');
            historialButton.classList.add('button', 'historial-button');
            historialButton.textContent = 'Historial';
            historialButton.addEventListener('click', () => {
                window.location.href = `historial.html?pacienteId=${paciente.cedula}`;
            });

            // Botón de jugar
            const jugarButton = document.createElement('button');
            jugarButton.classList.add('button', 'play-button');
            jugarButton.textContent = 'Jugar';
            jugarButton.addEventListener('click', () => {
                modal.style.display = 'block'; // Mostrar modal
                modal.dataset.pacienteId = paciente.cedula; // Guardar ID del paciente
            });

            // Agregar elementos a la fila y lista
            row.appendChild(img);
            row.appendChild(info);
            row.appendChild(historialButton);
            row.appendChild(jugarButton);
            patientList.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar pacientes:', error);
    }
}

// Cargar pacientes al iniciar la página
document.addEventListener('DOMContentLoaded', inicializarPagina);

// Manejo de selección de dificultad
document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', () => {
        const cantidad = button.dataset.difficulty;
        const pacienteId = modal.dataset.pacienteId;

        if (pacienteId) {
            window.location.href = `game.html?pacienteId=${pacienteId}&cantidad=${cantidad}`;
        } else {
            console.error("Error: pacienteId no definido.");
        }
    });
});
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('difficulty-modal').style.display = 'none';
});

// También permite cerrar el modal si el usuario hace clic fuera de él
window.addEventListener('click', (event) => {
    const modal = document.getElementById('difficulty-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// Botón de registro
document.getElementById('registrarPacienteButton').addEventListener('click', () => {
    window.location.href = 'registro-paciente.html';
});
