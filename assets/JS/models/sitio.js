const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Sitio
const Sitio = sequelize.define('Sitio', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Sitio',
    timestamps: false
});

// Método para obtener un sitio por su ID
Sitio.getSitioById = async function(id) {
    try {
        const sitio = await Sitio.findByPk(id);
        return sitio;
    } catch (error) {
        console.error('Error al obtener el sitio por ID:', error);
        throw error;
    }
};

// Método para obtener todos los sitios
Sitio.getAllSitios = async function() {
    try {
        const sitios = await Sitio.findAll();
        return sitios;
    } catch (error) {
        console.error('Error al obtener los sitios:', error);
        throw error;
    }
};

module.exports = Sitio;
