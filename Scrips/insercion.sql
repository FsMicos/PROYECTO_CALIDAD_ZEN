-- Seleccionar la base de datos
USE zenlabs;

-- Insertar datos únicos en la tabla Sitio
INSERT INTO Sitio (nombre) VALUES 
('Ferretería'), 
('Tienda de herramientas'), 
('Supermercado');

-- Insertar datos únicos en la tabla Profesional
INSERT INTO Profesional (nombre) VALUES 
('Ferretero'), 
('Herrero'), 
('Vendedor');

-- Insertar 20 productos en la tabla Producto con referencias a Sitio y Profesional
INSERT INTO Producto (nombre, id_sitio, id_profesional) VALUES 
('Martillo', 1, 1), 
('Destornillador', 1, 1), 
('Taladro', 2, 2), 
('Sierra', 2, 2), 
('Alicate', 3, 3), 
('Llave inglesa', 1, 1), 
('Lijadora', 1, 1), 
('Soplete', 2, 2), 
('Nivel', 3, 3), 
('Escalera', 1, 1), 
('Metro', 2, 2), 
('Cinta adhesiva', 3, 3), 
('Pistola de silicona', 1, 1), 
('Cincel', 2, 2), 
('Esmeriladora', 3, 3), 
('Sargento', 1, 1), 
('Broca', 2, 2), 
('Tornillo', 3, 3), 
('Punzón', 1, 1), 
('Espátula', 2, 2);