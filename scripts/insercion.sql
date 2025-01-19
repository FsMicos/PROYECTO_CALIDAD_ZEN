-- Seleccionar la base de datos
USE zenlabs;
INSERT INTO Medico (nombre, apellido, usuario, contrasena, telefono, correo)
VALUES 
    ('Michael', 'Trocellier', 'micos', 'micos123', '0992522882', 'fsmicos@gmail.com');
-- Insertar datos en la tabla Sitio
INSERT INTO Sitio (nombre) VALUES 
('Farmacia'), 
('Panadería'), 
('Papeleria'),
('Frutería'),
('Carnicería'),
('Peluquería'),
('Zapatería'),
('Floristería');

-- Insertar datos en la tabla Profesional
INSERT INTO Profesional (nombre) VALUES 
('Farmacéutico'), 
('Panadero'), 
('Papelero'),
('Verdulero'),
('Carnicero'),
('Peluquero'),
('Zapatero'),
('Florista');

INSERT INTO Paciente (nombre, apellido, edad)
VALUES 
    ('Michael', 'Trocellier', 28),
    ('Laura', 'Martínez', 35),
    ('Carlos', 'Pérez', 42),
    ('Ana', 'Gómez', 30),
    ('Javier', 'Rodríguez', 25),
    ('María', 'Fernández', 33),
    ('Luis', 'Torres', 50),
    ('Elena', 'Vega', 27),
    ('José', 'García', 29),
    ('Claudia', 'López', 31);

-- Insertar productos relacionados con cada sitio y profesional
INSERT INTO Producto (nombre, id_sitio, id_profesional, ruta_imagen_producto) VALUES 
-- Farmacia - Farmacéutico
('Vitamina C', 1, 1, '../resources/VitaminaC.png'), 
('Jarabe para la gripe', 1, 1, '../resources/JarabaDeGripe.png'), 
('Alcohol antiséptico', 1, 1, '../resources/AlcoholAntiseptico.png'), 
('Venda', 1, 1, '../resources/Venda.png'), 
('Gasa', 1, 1, '../resources/Gasa.png'),

-- Panadería - Panadero
('Pan de agua', 2, 2, '../resources/PanAgua.png'), 
('Pan de sal', 2, 2, '../resources/PanSal.png'), 
('Pan integral', 2, 2, '../resources/PanIntegral.png'), 
('Pan dulce', 2, 2, '../resources/PanDulce.png'), 
('Rosquillas', 2, 2, '../resources/Rosquillas.png'),

-- Tienda Escolar - Vendedor Escolar
('Cuaderno de cuadros', 3, 3, '../resources/CuadernoCuadros.png'), 
('Esfero azul', 3, 3, '../resources/EsferoAzul.png'), 
('Regla de 30 cm', 3, 3, '../resources/Regla30cm.png'), 
('Goma líquida', 3, 3, '../resources/GomaLiquida.png'), 
('Mochila escolar', 3, 3, '../resources/MochilaEscolar.png'),

-- Frutería - Frutero
('Plátano verde', 4, 4, '../resources/PlatanoVerde.png'), 
('Naranja', 4, 4, '../resources/Naranja.png'), 
('Mango', 4, 4, '../resources/Mango.png'), 
('Papaya', 4, 4, '../resources/Papaya.png'), 
('Sandía', 4, 4, '../resources/Sandia.png'),

-- Carnicería - Carnicero
('Carne molida', 5, 5, '../resources/CarneMolida.png'), 
('Pechuga de pollo', 5, 5, '../resources/PechugaPollo.png'), 
('Chuleta de cerdo', 5, 5, '../resources/ChuletaCerdo.png'), 
('Costillas', 5, 5, '../resources/Costillas.png'), 
('Salami', 5, 5, '../resources/Salami.png'),

-- Peluquería - Peluquero
('Tijeras para el cabello', 6, 6, '../resources/TijerasCabello.png'), 
('Tinte para el cabello', 6, 6, '../resources/TinteCabello.png'), 
('Secador de mano', 6, 6, '../resources/SecadorMano.png'), 
('Crema para alisar', 6, 6, '../resources/CremaAlisar.png'), 
('Capa de peluquería', 6, 6, '../resources/CapaPeluqueria.png'),

-- Zapatería - Zapatero
('Zapatos de niño', 7, 7, '../resources/ZapatosBoy.png'), 
('Sandalias de mujer', 7, 7, '../resources/SandaliasMujer.png'), 
('Botas de lluvia', 7, 7, '../resources/BotasLluvia.png'), 
('Zapatos de cuero', 7, 7, '../resources/ZapatosCuero.jpg'), 
('Zapatillas deportivas', 7, 7, '../resources/ZapatillasDeportivas.png'),

-- Floristería - Florista
('Ramos de rosas', 8, 8, '../resources/RamoRosas.png'), 
('Maceta de girasoles', 8, 8, '../resources/MacetaGirasoles.png'), 
('Claveles', 8, 8, '../resources/Claveles.png'), 
('Tulipanes', 8, 8, '../resources/Tulipanes.png'), 
('Orquídeas', 8, 8, '../resources/Orquideas.png');