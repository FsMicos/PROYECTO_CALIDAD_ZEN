const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente'); // Ajusta la ruta según tu estructura

// Ruta para obtener la lista de pacientes
router.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll(); // Suponiendo que tienes un modelo Paciente
        res.json(pacientes);
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
});

module.exports = router; // Exportar las rutas
