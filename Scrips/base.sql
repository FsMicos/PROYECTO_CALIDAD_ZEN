-- Crear la base de datos
CREATE DATABASE zenlabs;

-- Usar la base de datos
USE zenlabs;

-- Crear la tabla Producto
CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear la tabla Sitio
CREATE TABLE Sitio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_producto INT,
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

-- Crear la tabla Profesional
CREATE TABLE Profesional (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_producto INT,
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);