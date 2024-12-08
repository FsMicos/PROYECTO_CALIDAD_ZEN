const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profesional = sequelize.define('Profesional', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Profesional',
    timestamps: false
});

Profesional.getProfesionalById = async function(id) {
    try {
        return await Profesional.findByPk(id);
    } catch (error) {
        console.error('Error al obtener el profesional por ID:', error);
        throw error;
    }
};

Profesional.getAllProfesionales = async function() {
    try {
        return await Profesional.findAll();
    } catch (error) {
        console.error('Error al obtener los profesionales:', error);
        throw error;
    }
};

module.exports = Profesional;
