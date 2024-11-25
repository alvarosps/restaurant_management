-- Inserindo itens do menu
INSERT INTO menu_menuitem (name, description, price, stock)
VALUES
('Pizza Margherita', 'Pizza clássica com molho de tomate, mussarela e manjericão.', 25.90, 20),
('Hambúrguer Clássico', 'Pão, carne, queijo, alface e tomate.', 15.50, 30),
('Coca-Cola Lata', 'Refrigerante em lata 350ml.', 5.00, 50),
('Brownie de Chocolate', 'Sobremesa com chocolate e castanhas.', 8.00, 25),
('Salada Caesar', 'Alface, croutons, parmesão e molho Caesar.', 12.50, 15),
('Batata Frita', 'Porção de batata frita crocante.', 10.00, 40),
('Suco de Laranja', 'Suco natural de laranja.', 6.00, 35),
('Espaguete à Bolonhesa', 'Espaguete com molho de tomate e carne moída.', 18.00, 10),
('Sopa de Legumes', 'Sopa caseira com legumes frescos.', 12.00, 20),
('Filé Mignon', 'Filé mignon grelhado com molho madeira.', 50.00, 8);

-- Inserindo pedidos
INSERT INTO menu_order (table_number, menu_item_id, quantity, notes, status, created_at)
VALUES
(1, 51, 2, 'Sem manjericão, por favor.', 'Pending', NOW()),
(2, 52, 1, 'Sem tomate.', 'Paid', NOW() - INTERVAL '1 day'),
(3, 53, 3, 'Com gelo.', 'Cancelled', NOW() - INTERVAL '2 days'),
(4, 54, 1, 'Com sorvete.', 'Refunded', NOW() - INTERVAL '3 days'),
(2, 55, 2, 'Sem molho Caesar.', 'Pending', NOW()),
(1, 56, 1, 'Extra crocante.', 'Paid', NOW() - INTERVAL '1 hour'),
(4, 57, 4, 'Sem açúcar.', 'Pending', NOW()),
(3, 58, 1, 'Molho extra.', 'Paid', NOW() - INTERVAL '1 day'),
(2, 59, 1, 'Sem sal.', 'Cancelled', NOW() - INTERVAL '5 days'),
(4, 60, 2, 'Mal passado.', 'Paid', NOW() - INTERVAL '2 hours');

-- Inserindo auditorias de pedidos
INSERT INTO menu_orderaudit (order_id, status, changed_at)
VALUES
(1, 'Created', NOW()),
(2, 'Paid', NOW() - INTERVAL '1 day'),
(3, 'Cancelled', NOW() - INTERVAL '2 days'),
(4, 'Refunded', NOW() - INTERVAL '3 days'),
(5, 'Created', NOW()),
(6, 'Paid', NOW() - INTERVAL '1 hour'),
(7, 'Created', NOW()),
(8, 'Paid', NOW() - INTERVAL '1 day'),
(9, 'Cancelled', NOW() - INTERVAL '5 days'),
(10, 'Paid', NOW() - INTERVAL '2 hours');
