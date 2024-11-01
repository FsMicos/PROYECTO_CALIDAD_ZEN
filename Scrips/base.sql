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
    FOREIGN KEY (id_sitio) REFERENCES Sitio(id),
    FOREIGN KEY (id_profesional) REFERENCES Profesional(id)
);