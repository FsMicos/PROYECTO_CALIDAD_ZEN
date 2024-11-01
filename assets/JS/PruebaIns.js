const sequelize = require('./config/database');
const Producto = require('./models/Producto');
const Sitio = require('./models/Sitio');
const Profesional = require('./models/Profesional');

// Sincronizar todos los modelos con la base de datos
sequelize.sync()
    .then(() => {
        console.log("Tablas sincronizadas correctamente.");
        return Producto.create({ nombre: "Producto de ejemplo" });
    })
    .then(producto => {
        console.log("Producto creado:", producto);
    })
    .catch(err => {
        console.error("Error al sincronizar las tablas:", err);
    });