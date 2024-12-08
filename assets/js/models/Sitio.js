const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sitio = sequelize.define('Sitio', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Sitio',
    timestamps: false
});

Sitio.getSitioById = async function(id) {
    try {
        return await Sitio.findByPk(id);
    } catch (error) {
        console.error('Error al obtener el sitio por ID:', error);
        throw error;
    }
};

Sitio.getAllSitios = async function() {
    try {
        return await Sitio.findAll();
    } catch (error) {
        console.error('Error al obtener los sitios:', error);
        throw error;
    }
};

module.exports = Sitio;
