const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para la conexión a MySQL
const sequelize = new Sequelize('zenlabs', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;