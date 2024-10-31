const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Producto
const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Otras opciones del modelo (si es necesario)
    tableName: 'Producto',
    timestamps: false
});

module.exports = Producto;