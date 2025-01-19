const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

// Ruta para obtener la lista de pacientes
router.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
});


// Ruta para registrar un paciente
router.post('/pacientes', async (req, res) => {
    const { cedula, nombre, apellido, edad } = req.body;

    try {
        // Verificar si ya existe un paciente con la misma cédula
        const pacienteExistente = await Paciente.findOne({ where: { cedula } });
        if (pacienteExistente) {
            return res.status(400).json({ message: 'El paciente con esta cédula ya está registrado.' });
        }

        // Crear un nuevo paciente si no existe
        const nuevoPaciente = await Paciente.create({ cedula, nombre, apellido, edad });
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        console.error('Error al registrar paciente:', error);
        res.status(500).json({ message: 'Error al registrar el paciente' });
    }
});



module.exports = router;