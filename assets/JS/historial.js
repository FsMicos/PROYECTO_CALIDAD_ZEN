const historialTableBody = document.querySelector('#historial-table tbody');
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('pacienteId');

// Función para obtener y mostrar el historial
async function cargarHistorial() {
    try {
        const response = await fetch(`http://localhost:3000/api/intentos/${pacienteId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el historial');
        }

        const intentos = await response.json();

        historialTableBody.innerHTML = ''; // Limpiar la tabla antes de llenar

        intentos.forEach((intento, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${intento.aciertos}</td>
                <td>${intento.fallos}</td>
                <td>${new Date(intento.fecha).toLocaleDateString()}</td>
                <td>${Math.floor(intento.tiempo / 60)}:${String(intento.tiempo % 60).padStart(2, '0')}</td>
            `;
            historialTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar el historial:', error);
    }
}

// Evento para redirigir al inicio
document.getElementById('volverInicioButton').addEventListener('click', () => {
    window.location.href = 'inicio.html';
});

// Cargar el historial al cargar la página
document.addEventListener('DOMContentLoaded', cargarHistorial);
