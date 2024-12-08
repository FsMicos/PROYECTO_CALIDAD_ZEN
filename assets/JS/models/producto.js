const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sitio = require('./Sitio');
const Profesional = require('./Profesional');

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_sitio: {
        type: DataTypes.INTEGER,
        references: {
            model: Sitio,
            key: 'id'
        }
    },
    id_profesional: {
        type: DataTypes.INTEGER,
        references: {
            model: Profesional,
            key: 'id'
        }
    },
    ruta_imagen_producto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Producto',
    timestamps: false
});

Producto.getRandomProducts = async function() {
    try {
        const productos = await Producto.findAll({
            include: [
                { model: Sitio, as: 'sitio' },
                { model: Profesional, as: 'profesional' }
            ]
        });

        // Seleccionar 16 productos aleatorios
        return productos.sort(() => 0.5 - Math.random()).slice(0, 16);
    } catch (error) {
        console.error('Error al obtener productos aleatorios:', error);
        throw error;
    }
};

Producto.getSiteByProductName = async function(nombreProducto) {
    try {
        const producto = await Producto.findOne({
            where: { nombre: nombreProducto },
            include: { model: Sitio, as: 'sitio' }
        });
        return producto?.sitio || null;
    } catch (error) {
        console.error('Error al obtener el sitio por nombre de producto:', error);
        throw error;
    }
};

Producto.getProfessionalByProductName = async function(nombreProducto) {
    try {
        const producto = await Producto.findOne({
            where: { nombre: nombreProducto },
            include: { model: Profesional, as: 'profesional' }
        });
        return producto?.profesional || null;
    } catch (error) {
        console.error('Error al obtener el profesional por nombre de producto:', error);
        throw error;
    }
};

Producto.belongsTo(Sitio, { foreignKey: 'id_sitio', as: 'sitio' });
Producto.belongsTo(Profesional, { foreignKey: 'id_profesional', as: 'profesional' });

module.exports = Producto;