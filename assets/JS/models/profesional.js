const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Profesional
const Profesional = sequelize.define('Profesional', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Profesional',
    timestamps: false
});

// Método para obtener un profesional por su ID
Profesional.getProfesionalById = async function(id) {
    try {
        const profesional = await Profesional.findByPk(id);
        return profesional;
    } catch (error) {
        console.error('Error al obtener el profesional por ID:', error);
        throw error;
    }
};

// Método para obtener todos los profesionales
Profesional.getAllProfesionales = async function() {
    try {
        const profesionales = await Profesional.findAll();
        return profesionales;
    } catch (error) {
        console.error('Error al obtener los profesionales:', error);
        throw error;
    }
};

module.exports = Profesional;