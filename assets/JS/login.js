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
        // alert('Login exitoso');
        console.log(data); // Aquí puedes guardar el token o los datos si es necesario
        window.location.href = 'inicio.html'; // Redirigir al juego
      } else {
        // alert(data.message || 'Error al iniciar sesión');
        showAlert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // alert('Error en el servidor');
      showAlert('Error en el servidor');
    }
  });

function showAlert(message) {
  const alertOverlay = document.getElementById("alert-overlay");
  const alertMessage = document.getElementById("alert-message");
  alertMessage.textContent = message;
  alertOverlay.style.display = "flex";
}

// Función para cerrar la alerta
function closeAlert() {
  const alertOverlay = document.getElementById("alert-overlay");
  alertOverlay.style.display = "none";
}