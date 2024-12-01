const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Intento
const Intento = sequelize.define('Intento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tiempo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Intento',
    timestamps: false,
});

// Exportar el modelo sin definir la relación
module.exports = Intento;
