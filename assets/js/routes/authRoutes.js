const express = require('express');
const router = express.Router();
const Medico = require('../models/Medico');

// Ruta para el login
router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        const medico = await Medico.findOne({ where: { usuario } });

        if (!medico) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        if (medico.contrasena !== contrasena) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Login exitoso', medico });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;