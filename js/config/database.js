const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para la conexión a MySQL
const sequelize = new Sequelize('zenlabs', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;