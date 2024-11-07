-- Seleccionar la base de datos
USE zenlabs;
-- Insertar datos en la tabla Sitio
INSERT INTO Sitio (nombre) VALUES 
('Farmacia'), 
('Panadería'), 
('Tienda Escolar'),
('Frutería'),
('Carnicería'),
('Peluquería'),
('Zapatería'),
('Floristería');

-- Insertar datos en la tabla Profesional
INSERT INTO Profesional (nombre) VALUES 
('Farmacéutico'), 
('Panadero'), 
('Tienda de utiles escolares'),
('Verdulero'),
('Carnicero'),
('Peluquero'),
('Zapatero'),
('Florista');

-- Insertar productos relacionados con cada sitio y profesional
INSERT INTO Producto (nombre, id_sitio, id_profesional) VALUES 
-- Farmacia - Farmacéutico
('Vitamina C', 1, 1), 
('Jarabe para la gripe', 1, 1), 
('Alcohol antiséptico', 1, 1), 
('Venda', 1, 1), 
('Gasa', 1, 1),

-- Panadería - Panadero
('Pan de agua', 2, 2), 
('Pan de sal', 2, 2), 
('Pan integral', 2, 2), 
('Pan dulce', 2, 2), 
('Rosquillas', 2, 2),

-- Tienda Escolar - Vendedor Escolar
('Cuaderno de cuadros', 3, 3), 
('Esfero azul', 3, 3), 
('Regla de 30 cm', 3, 3), 
('Goma líquida', 3, 3), 
('Mochila escolar', 3, 3),

-- Frutería - Frutero
('Plátano verde', 4, 4), 
('Naranja', 4, 4), 
('Mango', 4, 4), 
('Papaya', 4, 4), 
('Sandía', 4, 4),

-- Carnicería - Carnicero
('Carne molida', 5, 5), 
('Pechuga de pollo', 5, 5), 
('Chuleta de cerdo', 5, 5), 
('Costillas', 5, 5), 
('Salami', 5, 5),

-- Peluquería - Peluquero
('Tijeras para el cabello', 6, 6), 
('Tinte para el cabello', 6, 6), 
('Secador de mano', 6, 6), 
('Crema para alisar', 6, 6), 
('Capa de peluquería', 6, 6),

-- Zapatería - Zapatero
('Zapatos de niño', 7, 7), 
('Sandalias de mujer', 7, 7), 
('Botas de lluvia', 7, 7), 
('Zapatos de cuero', 7, 7), 
('Zapatillas deportivas', 7, 7),

-- Floristería - Florista
('Ramos de rosas', 8, 8), 
('Maceta de girasoles', 8, 8), 
('Claveles', 8, 8), 
('Tulipanes', 8, 8), 
('Orquídeas', 8, 8);
