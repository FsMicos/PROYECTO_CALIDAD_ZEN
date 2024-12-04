-- Seleccionar la base de datos
USE zenlabs;
INSERT INTO Medico (nombre, apellido, usuario, contrasena, telefono, correo)
VALUES 
    ('Michael', 'Trocellier', 'micos', 'micos123', '0992522882', 'fsmicos@gmail.com');
-- Insertar datos en la tabla Sitio
INSERT INTO Sitio (nombre) VALUES 
('Farmacia'), 
('Panadería'), 
('Papelería'),
('Frutería'),
('Carnicería'),
('Peluquería'),
('Zapatería'),
('Floristería');

-- Insertar datos en la tabla Profesional
INSERT INTO Profesional (nombre) VALUES 
('Farmaceútico'), 
('Panadero'), 
('Vendedor de Útiles Escolares'),
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
('Vitamina C', 1, 1, '../resources/icons/Vitamina_C.png'),  
('Jarabe para la gripe', 1, 1, '../resources/icons/Jarabe_para_la_gripe.png'), 
('Alcohol antiséptico', 1, 1, '../resources/icons/Alcohol_antiseptico.png'), 
('Venda', 1, 1, '../resources/icons/Venda.png'), 
('Gasa', 1, 1, '../resources/icons/Gasa.png'),

-- Panadería - Panadero
('Pan de agua', 2, 2, '../resources/icons/Pan_de_agua.png'), 
('Pan de sal', 2, 2, '../resources/icons/Pan_de_sal.png'), 
('Pan integral', 2, 2, '../resources/icons/Pan_integral.png'), 
('Pan dulce', 2, 2, '../resources/icons/Pan_dulce.png'), 
('Rosquillas', 2, 2, '../resources/icons/Rosquillas.png'),

-- Tienda Escolar - Vendedor Escolar
('Cuaderno de cuadros', 3, 3, '../resources/icons/Cuaderno_de_cuadros.png'), 
('Esfero azul', 3, 3, '../resources/icons/Esfero_azul.png'), 
('Regla de 30 cm', 3, 3, '../resources/icons/Regla_de_30_cm.png'), 
('Goma líquida', 3, 3, '../resources/icons/Goma_liquida.png'), 
('Mochila escolar', 3, 3, '../resources/icons/Mochila_escolar.png'),

-- Frutería - Frutero
('Plátano verde', 4, 4, '../resources/icons/Platano_verde.png'), 
('Naranja', 4, 4, '../resources/icons/Naranja.png'), 
('Mango', 4, 4, '../resources/icons/Mango.png'), 
('Papaya', 4, 4, '../resources/icons/Papaya.png'), 
('Sandía', 4, 4, '../resources/icons/Sandia.png'),

-- Carnicería - Carnicero
('Carne molida', 5, 5, '../resources/icons/Carne_molida.png'), 
('Pechuga de pollo', 5, 5, '../resources/icons/Pechuga_de_pollo.png'), 
('Chuleta de cerdo', 5, 5, '../resources/icons/Chuleta_de_cerdo.png'), 
('Costillas', 5, 5, '../resources/icons/Costillas.png'), 
('Salami', 5, 5, '../resources/icons/Salami.png'),

-- Peluquería - Peluquero
('Tijeras para el cabello', 6, 6, '../resources/icons/Tijeras_para_el_cabello.png'), 
('Tinte para el cabello', 6, 6, '../resources/icons/Tinte_para_el_cabello.png'), 
('Secador de mano', 6, 6, '../resources/icons/Secador_de_mano.png'), 
('Crema para alisar', 6, 6, '../resources/icons/Crema_para_alisar.png'), 
('Capa de peluquería', 6, 6, '../resources/icons/Capa_de_peluqueria.png'),

-- Zapatería - Zapatero
('Zapatos de niño', 7, 7, '../resources/icons/Zapatos_de_nino.png'), 
('Sandalias de mujer', 7, 7, '../resources/icons/Sandalias_de_mujer.png'), 
('Botas de lluvia', 7, 7, '../resources/icons/Botas_de_lluvia.png'), 
('Zapatos de cuero', 7, 7, '../resources/icons/Zapatos_de_cuero.png'), 
('Zapatillas deportivas', 7, 7, '../resources/icons/Zapatillas_deportivas.png'),

-- Floristería - Florista
('Ramos de rosas', 8, 8, '../resources/icons/Ramos_de_rosas.png'), 
('Maceta de girasoles', 8, 8, '../resources/icons/Maceta_de_girasoles.png'), 
('Claveles', 8, 8, '../resources/icons/Claveles.png'), 
('Tulipanes', 8, 8, '../resources/icons/Tulipanes.png'), 
('Orquídeas', 8, 8, '../resources/icons/Orquideas.png');
