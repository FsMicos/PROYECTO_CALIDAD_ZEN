const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./producto');  // Importar el modelo Producto

// Definir el modelo Sitio
const Sitio = sequelize.define('Sitio', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto, // Relación con la tabla Producto
            key: 'id'
        }
    }
}, {
    tableName: 'Sitio',
    timestamps: false
});

module.exports = Sitio;