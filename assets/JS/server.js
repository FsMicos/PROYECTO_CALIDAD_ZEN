const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas

// Resto de la configuración del servidor
const Producto = require('./models/Producto');

app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Producto.getRandomProducts();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
