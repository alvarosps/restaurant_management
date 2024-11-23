-- Resetando tabelas
DROP TABLE IF EXISTS order_audit CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Executar novamente o script de criação de tabelas
\i create_tables.sql

-- Inserir os dados novamente
\i insert_mock_data.sql
