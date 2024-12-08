document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: username, contrasena: password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login exitoso
            console.log(data); // Maneja el token o datos adicionales aquí si es necesario
            window.location.href = 'inicio.html';
        } else {
            showAlert(data.message || 'Error al iniciar sesión'); // Mensaje de error enviado por el servidor
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        showAlert('Error en el servidor'); // Manejo de errores de red o servidor
    }
});

// Muestra una alerta personalizada con un mensaje
function showAlert(message) {
    const alertOverlay = document.getElementById("alert-overlay");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    alertOverlay.style.display = "flex";
}

// Cierra la alerta personalizada
function closeAlert() {
    const alertOverlay = document.getElementById("alert-overlay");
    alertOverlay.style.display = "none";
}