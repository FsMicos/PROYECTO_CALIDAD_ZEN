const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Ruta para obtener productos aleatorios
router.get('/productos', async (req, res) => {
    try {
        let cantidad = parseInt(req.query.cantidad);

        // Validar que cantidad sea un número entre 1 y 20
        if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
            cantidad = 16; // Valor por defecto si es inválido
        }

        const productos = await Producto.getRandomProducts(cantidad);
        res.json(productos);
    } catch (error) {
        console.error("Error en /productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
});


module.exports = router;