const sequelize = require('./config/database');
const Producto = require('./models/producto');
const Sitio = require('./models/sitio');
const Profesional = require('./models/profesional');

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