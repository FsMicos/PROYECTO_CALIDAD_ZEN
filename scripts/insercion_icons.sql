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
('Vitamina C', 1, 1, './assets/img/products/Vitamina_C.png'),  
('Jarabe para la gripe', 1, 1, './assets/img/products/Jarabe_para_la_gripe.png'), 
('Alcohol antiséptico', 1, 1, './assets/img/products/Alcohol_antiseptico.png'), 
('Venda', 1, 1, './assets/img/products/Venda.png'), 
('Gasa', 1, 1, './assets/img/products/Gasa.png'),

-- Panadería - Panadero
('Pan de agua', 2, 2, './assets/img/products/Pan_de_agua.png'), 
('Pan de sal', 2, 2, './assets/img/products/Pan_de_sal.png'), 
('Pan integral', 2, 2, './assets/img/products/Pan_integral.png'), 
('Pan dulce', 2, 2, './assets/img/products/Pan_dulce.png'), 
('Rosquillas', 2, 2, './assets/img/products/Rosquillas.png'),

-- Tienda Escolar - Vendedor Escolar
('Cuaderno de cuadros', 3, 3, './assets/img/products/Cuaderno_de_cuadros.png'), 
('Esfero azul', 3, 3, './assets/img/products/Esfero_azul.png'), 
('Regla de 30 cm', 3, 3, './assets/img/products/Regla_de_30_cm.png'), 
('Goma líquida', 3, 3, './assets/img/products/Goma_liquida.png'), 
('Mochila escolar', 3, 3, './assets/img/products/Mochila_escolar.png'),

-- Frutería - Frutero
('Plátano verde', 4, 4, './assets/img/products/Platano_verde.png'), 
('Naranja', 4, 4, './assets/img/products/Naranja.png'), 
('Mango', 4, 4, './assets/img/products/Mango.png'), 
('Papaya', 4, 4, './assets/img/products/Papaya.png'), 
('Sandía', 4, 4, './assets/img/products/Sandia.png'),

-- Carnicería - Carnicero
('Carne molida', 5, 5, './assets/img/products/Carne_molida.png'), 
('Pechuga de pollo', 5, 5, './assets/img/products/Pechuga_de_pollo.png'), 
('Chuleta de cerdo', 5, 5, './assets/img/products/Chuleta_de_cerdo.png'), 
('Costillas', 5, 5, './assets/img/products/Costillas.png'), 
('Salami', 5, 5, './assets/img/products/Salami.png'),

-- Peluquería - Peluquero
('Tijeras para el cabello', 6, 6, './assets/img/products/Tijeras_para_el_cabello.png'), 
('Tinte para el cabello', 6, 6, './assets/img/products/Tinte_para_el_cabello.png'), 
('Secador de mano', 6, 6, './assets/img/products/Secador_de_mano.png'), 
('Crema para alisar', 6, 6, './assets/img/products/Crema_para_alisar.png'), 
('Capa de peluquería', 6, 6, './assets/img/products/Capa_de_peluqueria.png'),

-- Zapatería - Zapatero
('Zapatos de niño', 7, 7, './assets/img/products/Zapatos_de_nino.png'), 
('Sandalias de mujer', 7, 7, './assets/img/products/Sandalias_de_mujer.png'), 
('Botas de lluvia', 7, 7, './assets/img/products/Botas_de_lluvia.png'), 
('Zapatos de cuero', 7, 7, './assets/img/products/Zapatos_de_cuero.png'), 
('Zapatillas deportivas', 7, 7, './assets/img/products/Zapatillas_deportivas.png'),

-- Floristería - Florista
('Ramos de rosas', 8, 8, './assets/img/products/Ramos_de_rosas.png'), 
('Maceta de girasoles', 8, 8, './assets/img/products/Maceta_de_girasoles.png'), 
('Claveles', 8, 8, './assets/img/products/Claveles.png'), 
('Tulipanes', 8, 8, './assets/img/products/Tulipanes.png'), 
('Orquídeas', 8, 8, './assets/img/products/Orquideas.png');
