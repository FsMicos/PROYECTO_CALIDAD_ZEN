document.getElementById('registroPacienteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const edad = document.getElementById('edad').value;

    // Validar campos antes de enviar
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
        alert('El nombre solo debe contener letras.');
        return;
    }

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido)) {
        alert('El apellido solo debe contener letras.');
        return;
    }

    if (!edad || isNaN(edad) || edad < 1) {
        alert('La edad debe ser un número válido mayor a 0.');
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
            alert('Paciente registrado con éxito');
            window.location.href = 'inicio.html';
        } else {
            alert(data.message || 'Error al registrar el paciente');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error en el servidor');
    }
});


document.getElementById('volverInicioButton').addEventListener('click', () => {
    window.location.href = 'inicio.html'; // Redirige al inicio
});
