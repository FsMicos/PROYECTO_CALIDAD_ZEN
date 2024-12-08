const patientList = document.getElementById('patient-list');

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

            // Botón para redirigir al historial del paciente
            const historialButton = document.createElement('button');
            historialButton.classList.add('button', 'historial-button');
            historialButton.textContent = 'Historial';
            historialButton.addEventListener('click', () => {
                window.location.href = `historial.html?pacienteId=${paciente.id}`;
            });

            // Botón para iniciar el juego con el paciente
            const jugarButton = document.createElement('button');
            jugarButton.classList.add('button', 'play-button');
            jugarButton.textContent = 'Jugar';
            jugarButton.addEventListener('click', () => {
                window.location.href = `game.html?pacienteId=${paciente.id}`;
            });

            // Ensamblar elementos en la fila y agregarla a la lista de pacientes
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

document.getElementById('registrarPacienteButton').addEventListener('click', () => {
    window.location.href = 'registro-paciente.html';
});

// Carga los datos al iniciar la página
document.addEventListener('DOMContentLoaded', inicializarPagina);