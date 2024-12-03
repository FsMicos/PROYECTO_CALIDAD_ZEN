const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    aciertos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    fallos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'Intento',
    timestamps: false,
});

module.exports = Intento;
