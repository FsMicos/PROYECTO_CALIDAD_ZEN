// Obtener el contenedor de la lista de pacientes
const patientList = document.getElementById('patient-list');

// Función para inicializar la página
async function inicializarPagina() {
    try {
        // Llamar a la API para obtener los pacientes
        const response = await fetch('http://localhost:3000/api/pacientes');
        const pacientes = await response.json();

        // Iterar sobre los pacientes y crear elementos dinámicos
        pacientes.forEach(paciente => {
            const row = document.createElement('div');
            row.classList.add('row');

            // Imagen de usuario
            const img = document.createElement('img');
            img.src = "../assets/img/usuario.png";
            img.alt = "Paciente";
            img.classList.add('usuario-image');

            // Información del paciente
            const info = document.createElement('div');
            info.classList.add('word');
            info.textContent = `${paciente.nombre} ${paciente.apellido} (Edad: ${paciente.edad})`;

            // Botón Historial
            const historialButton = document.createElement('button');
            historialButton.classList.add('button');
            historialButton.classList.add('historial-button');
            historialButton.textContent = 'Historial';
            historialButton.addEventListener('click', () => {
                // Redirigir al historial del paciente (No implementado)
                window.location.href = `historial.html?pacienteId=${paciente.id}`;
            });

            // Botón Jugar
            const jugarButton = document.createElement('button');
            jugarButton.classList.add('button');
            jugarButton.classList.add('play-button');
            jugarButton.textContent = 'Jugar';
            jugarButton.addEventListener('click', () => {
                // Redirigir a la página del juego (No implementado)
                window.location.href = `game.html?pacienteId=${paciente.id}`;
            });

            // Agregar elementos a la fila
            row.appendChild(img);
            row.appendChild(info);
            row.appendChild(historialButton);
            row.appendChild(jugarButton);

            // Agregar la fila al contenedor
            patientList.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar pacientes:', error);
    }
}

document.getElementById('registrarPacienteButton').addEventListener('click', () => {
    window.location.href = 'registro-paciente.html'; // Redirige a la página de registro
});

// Llamar a la función para inicializar la página
document.addEventListener('DOMContentLoaded', inicializarPagina);
