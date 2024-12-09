const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Paciente = require('./js/models/Paciente'); // Importar el modelo Paciente
const Intento = require('./js/models/Intento');   // Importar el modelo Intento

// Definir relaciones
Paciente.hasMany(Intento, { foreignKey: 'id_paciente' });
Intento.belongsTo(Paciente, { foreignKey: 'id_paciente' });

const authRoutes = require('./js/routes/authRoutes');       // Rutas de autenticación
const productoRoutes = require('./js/routes/productoRoutes'); // Rutas de productos
const pacientesRoutes = require('./js/routes/pacientesRoutes'); // Rutas de pacientes
const intentosRoutes = require('./js/routes/intentosRoutes');   // Ruta de intentos

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

// Usar las rutas
app.use('/api', authRoutes);       // Montar rutas de autenticación bajo /api
app.use('/api', productoRoutes);  // Montar rutas de productos bajo /api
app.use('/api', pacientesRoutes); // Montar rutas de pacientes bajo /api
app.use('/api', intentosRoutes);  // Montar las rutas bajo /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});