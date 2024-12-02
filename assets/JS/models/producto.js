const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sitio = require('./Sitio');
const Profesional = require('./Profesional');

// Definir el modelo Producto
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

// Método para obtener 16 productos aleatorios, incluyendo Sitio y Profesional
Producto.getRandomProducts = async function() {
    try {
        const productos = await Producto.findAll({
            include: [
                { model: Sitio, as: 'sitio' },
                { model: Profesional, as: 'profesional' }
            ]
        });
        
        // Seleccionar 16 productos aleatorios si hay más de 16
        const shuffled = productos.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 16);
    } catch (error) {
        console.error('Error al obtener productos aleatorios:', error);
        throw error;
    }
};
//metodo para encontrar el sitio de un producto por el nombre de un producto
Producto.getSiteByProductName = async function(nombreProducto) {
    try {
        const sitio = await Producto.findOne({
            where: { nombre: nombreProducto },
            include: { model: Sitio, as: 'sitio' }
        });
        return sitio.sitio;
    } catch (error) {
        console.error('Error al obtener el sitio por nombre de producto:', error);
        throw error;
    }
};
//metodo para econtrar el profesional de un producto por el nombre de un producto
Producto.getProfessionalByProductName = async function(nombreProducto) {
    try {
        const profesional = await Producto.findOne({
            where: { nombre: nombreProducto },
            include: { model: Profesional, as: 'profesional'}
        });
        return profesional.profesional;
    } catch (error) {
        console.error('Error al obtener el profesional por nombre de producto:', error);
        throw error;
    }
};
// Definir las asociaciones
Producto.belongsTo(Sitio, { foreignKey: 'id_sitio', as: 'sitio' });
Producto.belongsTo(Profesional, { foreignKey: 'id_profesional', as: 'profesional' });

module.exports = Producto;
