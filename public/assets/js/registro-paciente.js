// Obtener la base del servidor actual
const apiBaseUrl = `${window.location.origin}/api`;

document.getElementById('registroPacienteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const edad = document.getElementById('edad').value;

    clearErrorMessages(); // Limpiar mensajes de error previos

    // Validaciones de los campos de entrada
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
        showErrorNombreMessage('El nombre solo debe contener letras.');
        return;
    }

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido)) {
        showErrorApellidoMessage('El apellido solo debe contener letras.');
        return;
    }

    if (!edad || isNaN(edad) || edad < 1) {
        showErrorEdadMessage('La edad debe ser un número válido mayor a 0.');
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/pacientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, edad }),
        });

        const data = await response.json();

        if (response.ok) {
            showSuccessAlert(); // Muestra una alerta de éxito
        } else {
            showErrorAlert(data.message || 'Error al registrar el paciente'); // Muestra un error enviado por el servidor
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        showErrorAlert('Error en el servidor');
    }
});

// Limpiar mensajes de error en los campos de entrada
function clearErrorMessages() {
    showErrorNombreMessage('');
    showErrorApellidoMessage('');
    showErrorEdadMessage('');
}

// Muestra un mensaje de error asociado al nombre
function showErrorNombreMessage(message) {
    document.getElementById('nombreError').textContent = message;
}

// Muestra un mensaje de error asociado al apellido
function showErrorApellidoMessage(message) {
    document.getElementById('apellidoError').textContent = message;
}

// Muestra un mensaje de error asociado a la edad
function showErrorEdadMessage(message) {
    document.getElementById('edadError').textContent = message;
}

// Muestra una alerta de éxito
function showSuccessAlert() {
    const alertOverlay = document.getElementById("alert-overlay-success");
    alertOverlay.style.display = "flex";
}

// Muestra una alerta de error con el mensaje proporcionado
function showErrorAlert(message) {
    const alertOverlay = document.getElementById("alert-overlay-error");
    document.getElementById("alert-message-error").textContent = message;
    alertOverlay.style.display = "flex";
}

// Cierra la alerta de éxito
function closeSuccessAlert() {
    const alertOverlay = document.getElementById("alert-overlay-success");
    alertOverlay.style.display = "none";
}

// Cierra la alerta de error
function closeErrorAlert() {
    const alertOverlay = document.getElementById("alert-overlay-error");
    alertOverlay.style.display = "none";
}

// Redirige al inicio
document.getElementById('volverInicioButton').addEventListener('click', () => {
    window.location.href = 'inicio.html';
});