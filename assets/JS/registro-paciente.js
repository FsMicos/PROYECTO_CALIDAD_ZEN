document.getElementById('registroPacienteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const edad = document.getElementById('edad').value;

    clearErrorMessages(); // Limpiar mensajes de error

    // Validar campos antes de enviar
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
        // alert('El nombre solo debe contener letras.');
        showErrorNombreMessage('El nombre solo debe contener letras.');
        return;
    }

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido)) {
        // alert('El apellido solo debe contener letras.');
        showErrorApellidoMessage('El apellido solo debe contener letras.');
        return;
    }

    if (!edad || isNaN(edad) || edad < 1) {
        // alert('La edad debe ser un número válido mayor a 0.');
        showErrorEdadMessage('La edad debe ser un número válido mayor a 0.');
        return;
    }

    // Si todo es válido, envía la solicitud
    try {
        const response = await fetch('http://localhost:3000/api/pacientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, edad }),
        });

        const data = await response.json();

        if (response.ok) {
            // alert('Paciente registrado con éxito');
            showSuccessAlert();
            // window.location.href = 'inicio.html';
        } else {
            // alert(data.message || 'Error al registrar el paciente');
            showErrorAlert(data.message || 'Error al registrar el paciente');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        // alert('Error en el servidor');
        showAlert('Error en el servidor');
    }
});

function clearErrorMessages() {
    showErrorNombreMessage('');
    showErrorApellidoMessage('');
    showErrorEdadMessage('');
}

function showErrorNombreMessage(message) {
    document.getElementById('nombreError').textContent = message;
}

function showErrorApellidoMessage(message) {
    document.getElementById('apellidoError').textContent = message;
}

function showErrorEdadMessage(message) {
    document.getElementById('edadError').textContent = message;
}

function showSuccessAlert() {
    const alertOverlay = document.getElementById("alert-overlay-success");
    const alertMessage = document.getElementById("alert-message-success");

    // Mostrar la alerta
    alertOverlay.style.display = "flex";
}

function showErrorAlert(message) {
    const alertOverlay = document.getElementById("alert-overlay-error");
    const alertMessage = document.getElementById("alert-message-error");

    // Actualizar el mensaje
    alertMessage.textContent = message;

    // Mostrar la alerta
    alertOverlay.style.display = "flex";
}

  
// Función para cerrar la alerta
function closeSuccessAlert() {
    const alertOverlay = document.getElementById("alert-overlay-success");
    alertOverlay.style.display = "none";
}

// Función para cerrar la alerta
function closeErrorAlert() {
    const alertOverlay = document.getElementById("alert-overlay-error");
    alertOverlay.style.display = "none";
}


document.getElementById('volverInicioButton').addEventListener('click', () => {
    window.location.href = 'inicio.html'; // Redirige al inicio
});
