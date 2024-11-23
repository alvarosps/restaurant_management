-- Inserindo usuários de teste
INSERT INTO users (first_name, last_name, email, password, cpf, telephone, table_number, is_active, is_staff, is_superuser)
VALUES 
('Admin', 'User', 'admin@example.com', 'admin', '111.222.333-44', '(51) 99999-0000', NULL, TRUE, TRUE, TRUE),
('John', 'Doe', 'test1@example.com', 'test', '123.456.789-10', '(51) 91234-5678', 1, TRUE, FALSE, FALSE),
('Jane', 'Doe', 'test2@example.com', 'test', '987.654.321-00', '(51) 98765-4321', 2, TRUE, FALSE, FALSE);

-- Inserindo itens do menu
INSERT INTO menu_items (name, description, price, stock)
VALUES 
('Pizza Margherita', 'Pizza clássica com molho de tomate, mussarela e manjericão', 25.90, 10),
('Hambúrguer Clássico', 'Pão, carne, queijo, alface e tomate', 15.50, 15),
('Coca-Cola Lata', 'Refrigerante em lata 350ml', 5.00, 30),
('Brownie de Chocolate', 'Sobremesa com chocolate e castanhas', 8.00, 20);

-- Inserindo pedidos
INSERT INTO orders (user_id, table_number, menu_item_id, quantity, notes, status, payment_id)
VALUES
(2, 1, 1, 2, 'Sem manjericão, por favor.', 'Pending', NULL),
(3, 2, 3, 3, NULL, 'Paid', 'stripe_payment_id_123'),
(3, 2, 4, 1, 'Colocar sorvete junto.', 'Cancelled', NULL);

-- Inserindo auditorias de pedidos
INSERT INTO order_audit (order_id, status)
VALUES
(1, 'Created'),
(2, 'Paid'),
(3, 'Cancelled');
