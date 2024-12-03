const express = require('express');
const router = express.Router();
const Intento = require('../models/Intento'); // Modelo Intento

// Endpoint para crear un nuevo intento
router.post('/intentos', async (req, res) => {
    const { id_paciente, tiempo } = req.body;

    try {
        // Crear el intento en la base de datos
        const intento = await Intento.create({
            id_paciente: id_paciente,
            fecha: new Date(), // Fecha actual
            tiempo: tiempo,
        });

        res.status(201).json(intento);
    } catch (error) {
        console.error('Error al crear intento:', error);
        res.status(500).json({ error: 'Error al crear intento' });
    }
});

// Ruta para obtener el historial de un paciente
router.get('/intentos/:id_paciente', async (req, res) => {
    const { id_paciente } = req.params;

    try {
        const intentos = await Intento.findAll({
            where: { id_paciente },
            order: [['fecha', 'DESC']], // Ordenar por fecha descendente
        });
        res.status(200).json(intentos);
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        res.status(500).json({ message: 'Error al obtener el historial' });
    }
});

module.exports = router;
