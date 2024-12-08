const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Ruta para obtener productos aleatorios
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.getRandomProducts();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

module.exports = router;