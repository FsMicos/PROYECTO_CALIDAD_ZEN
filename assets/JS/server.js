const express = require('express');
const cors = require('cors');
const app = express();
const Producto = require('./models/Producto'); // Importa el modelo Producto con asociaciones definidas

app.use(cors()); // Habilitar CORS para todas las rutas

// Ruta para obtener 16 productos aleatorios junto con sus sitios y profesionales
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Producto.getRandomProducts(); // Este método debe incluir `Sitio` y `Profesional`
        res.json(productos); // Envía los productos como respuesta en formato JSON
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
