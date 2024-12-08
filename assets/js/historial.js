const historialTableBody = document.querySelector('#historial-table tbody');
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('pacienteId'); // ID del paciente obtenido de la URL

// Función para obtener y mostrar el historial del paciente
async function cargarHistorial() {
    try {
        const response = await fetch(`http://localhost:3000/api/intentos/${pacienteId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el historial');
        }

        const intentos = await response.json();
        historialTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        // Crear una fila por cada intento del historial
        intentos.forEach((intento, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td> <!-- Número de intento -->
                <td>${intento.aciertos}</td> <!-- Aciertos del intento -->
                <td>${intento.fallos}</td> <!-- Fallos del intento -->
                <td>${intento.vacios}</td> <!-- Campos vacíos del intento -->
                <td>${new Date(intento.fecha).toLocaleDateString()}</td> <!-- Fecha del intento -->
                <td>${Math.floor(intento.tiempo / 60)}:${String(intento.tiempo % 60).padStart(2, '0')}</td> <!-- Tiempo en minutos:segundos -->
            `;
            historialTableBody.appendChild(row); // Agregar la fila a la tabla
        });
    } catch (error) {
        console.error('Error al cargar el historial:', error);
    }
}

// Redirigir al inicio al hacer clic en el botón
document.getElementById('volverInicioButton').addEventListener('click', () => {
    window.location.href = 'inicio.html';
});

// Cargar el historial cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarHistorial);