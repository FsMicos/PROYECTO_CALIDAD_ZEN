const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

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

// Ruta para registrar un paciente
router.post('/pacientes', async (req, res) => {
    console.log('Solicitud POST recibida en /api/pacientes');
    const { nombre, apellido, edad } = req.body;

    try {
        console.log('Datos recibidos:', { nombre, apellido, edad });
        const nuevoPaciente = await Paciente.create({ nombre, apellido, edad });
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        console.error('Error al registrar paciente:', error);
        res.status(500).json({ message: 'Error al registrar el paciente' });
    }
});

module.exports = router;
