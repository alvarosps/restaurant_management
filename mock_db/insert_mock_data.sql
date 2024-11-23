-- Inserindo usuários de teste
INSERT INTO users_user (first_name, last_name, email, password, cpf, telephone, table_number, is_active, is_staff, is_superuser)
VALUES
('Admin', 'User', 'admin@example.com', 'admin', '111.222.333-44', '(51) 99999-0000', NULL, TRUE, TRUE, TRUE),
('John', 'Doe', 'john.doe@example.com', 'password', '123.456.789-00', '(51) 98765-4321', 1, TRUE, FALSE, FALSE),
('Jane', 'Smith', 'jane.smith@example.com', 'password', '987.654.321-00', '(51) 91234-5678', 2, TRUE, FALSE, FALSE),
('Carlos', 'Silva', 'carlos.silva@example.com', 'password', '456.789.123-99', '(51) 93456-7890', 3, TRUE, FALSE, FALSE),
('Maria', 'Oliveira', 'maria.oliveira@example.com', 'password', '789.123.456-88', '(51) 90012-3456', 4, TRUE, FALSE, FALSE);

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
INSERT INTO menu_order (user_id, table_number, menu_item_id, quantity, notes, status, created_at)
VALUES
(2, 1, 1, 2, 'Sem manjericão, por favor.', 'Pending', NOW()),
(3, 2, 2, 1, 'Sem tomate.', 'Paid', NOW() - INTERVAL '1 day'),
(4, 3, 3, 3, 'Com gelo.', 'Cancelled', NOW() - INTERVAL '2 days'),
(5, 4, 4, 1, 'Com sorvete.', 'Refunded', NOW() - INTERVAL '3 days'),
(3, 2, 5, 2, 'Sem molho Caesar.', 'Pending', NOW()),
(2, 1, 6, 1, 'Extra crocante.', 'Paid', NOW() - INTERVAL '1 hour'),
(5, 4, 7, 4, 'Sem açúcar.', 'Pending', NOW()),
(4, 3, 8, 1, 'Molho extra.', 'Paid', NOW() - INTERVAL '1 day'),
(3, 2, 9, 1, 'Sem sal.', 'Cancelled', NOW() - INTERVAL '5 days'),
(5, 4, 10, 2, 'Mal passado.', 'Paid', NOW() - INTERVAL '2 hours');

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
