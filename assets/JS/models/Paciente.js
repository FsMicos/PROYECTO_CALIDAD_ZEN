const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Paciente
const Paciente = sequelize.define('Paciente', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Paciente',
    timestamps: false,
});

// Exportar el modelo sin definir la relación
module.exports = Paciente;
