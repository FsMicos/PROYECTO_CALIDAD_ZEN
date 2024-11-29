const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const productoRoutes = require('./routes/productoRoutes'); // Rutas de productos
const pacientesRoutes = require('./routes/pacientesRoutes'); // Rutas de pacientes
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas
app.use('/api', authRoutes);       // Montar rutas de autenticación bajo /api
app.use('/api', productoRoutes);  // Montar rutas de productos bajo /api
app.use('/api', pacientesRoutes);  // Montar rutas de pacientes bajo /api


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
