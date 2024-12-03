-- Crear la base de datos
CREATE DATABASE zenlabs;

-- Usar la base de datos
USE zenlabs;

-- Crear la tabla Sitio
CREATE TABLE Sitio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear la tabla Profesional
CREATE TABLE Profesional (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear la tabla Producto con referencias a Sitio y Profesional
CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_sitio INT,
    id_profesional INT,
    ruta_imagen_producto VARCHAR(100),
    FOREIGN KEY (id_sitio) REFERENCES Sitio(id),
    FOREIGN KEY (id_profesional) REFERENCES Profesional(id)
);

-- Crear la tabla Medico
CREATE TABLE Medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE
);

-- Crear la tabla Paciente
CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    edad INT NOT NULL
);
-- Crear la tabla Intento
CREATE TABLE Intento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    fecha DATETIME NOT NULL,
    tiempo INT NOT NULL, -- Tiempo en segundos
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id)
);

-- Modificar la tabla Intento para incluir aciertos y fallos
ALTER TABLE Intento
ADD COLUMN aciertos INT NOT NULL DEFAULT 0,
ADD COLUMN fallos INT NOT NULL DEFAULT 0;
