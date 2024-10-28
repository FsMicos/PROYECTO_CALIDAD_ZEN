const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./producto');  // Importar el modelo Producto

// Definir el modelo Profesional
const Profesional = sequelize.define('Profesional', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id'
        }
    }
}, {
    tableName: 'Profesional',
    timestamps: false
});

module.exports = Profesional;
