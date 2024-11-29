const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Paciente
const Paciente = sequelize.define('Paciente', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Paciente',
    timestamps: false
});

// Método para obtener un paciente por su ID
Paciente.getPacienteById = async function(id) {
    try {
        const paciente = await Paciente.findByPk(id);
        return paciente;
    } catch (error) {
        console.error('Error al obtener el paciente por ID:', error);
        throw error;
    }
};

// Método para obtener todos los pacientes
Paciente.getAllPacientes = async function() {
    try {
        const pacientes = await Paciente.findAll();
        return pacientes;
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        throw error;
    }
};

module.exports = Paciente;
