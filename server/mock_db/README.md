# Banco de Dados Mock para o Sistema de Gerenciamento de Restaurantes

Esta pasta contém scripts em PostgreSQL para criar, popular e resetar o banco de dados com dados fictícios para o projeto **Sistema de Gerenciamento de Restaurantes**. Esses scripts permitem testar todas as funcionalidades da aplicação, incluindo usuários, itens do menu, pedidos e registros de auditoria.

## Descrição

O banco de dados inclui:
  - Usuários predefinidos, incluindo um administrador e usuários padrão.
  - Itens do menu com níveis de estoque e preços de exemplo.
  - Pedidos vinculados a usuários ou mesas, com vários status (e.g., Pendente, Pago, Cancelado).
  - Logs de auditoria para rastrear alterações no status dos pedidos.

## Como Usar
    - Em primeiro uso, certifique-se que o banco de dados está criado:
```bash
set PGCLIENTENCODING=UTF8
psql -U <seu-usuario>
DROP DATABASE restaurant_db;
CREATE DATABASE restaurant_db ENCODING 'UTF8' TEMPLATE template0;
exit
```
    - Execute os scripts no PostgreSQL:
```bash
psql -U <seu-usuario> -d <seu-banco-de-dados> -f insert_mock_data.sql
```

## Observações
    - Certifique-se de que o PostgreSQL está instalado e em execução no seu sistema. Caso não esteja rodando, no windows você deve abrir "Serviços" e iniciar o serviço do postgresql.
    - Atualize os placeholders <seu-usuario> e <seu-banco-de-dados> com as credenciais e o nome do banco de dados que você está utilizando.

Esses scripts são destinados apenas para fins de desenvolvimento e testes. Não os utilize em um ambiente de produção.

