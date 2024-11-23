# Backend - Restaurant Management System

Este é o backend do sistema de gerenciamento de restaurantes. Ele fornece uma API RESTful para gerenciar usuários, pedidos, relatórios, e itens de cardápio.

## **Pré-requisitos**
- Python 3.10 ou superior
- PostgreSQL
- Ambiente virtual Python (`venv`)
- Node.js (opcional, para gerenciar dependências frontend através do mesmo ambiente)

---

## **Instalação**

1. Navega até a pasta `server`:
   ```bash
   cd server
   ```

2. Configure o ambiente virtual:
    ```bash
    python -m venv env
    source env/bin/activate  # No Windows: .\env\Scripts\activate
    ```

3.Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure o banco de dados PostgreSQL:
    - Crie um banco de dados e um usuário no PostgreSQL.
    - Atualize as variáveis no arquivo .env com suas credenciais de banco.

5. Realize as migrações:
    ```bash
    python manage.py migrate
    ```

6. Crie um superuser:
    ```bash
    python manage.py createsuperuser
    ```

7. Inicie o servidor:
    ```bash
    python manage.py runserver
    ```

##**Variáveis de Ambiente**
    - Crie um arquivo `.env` na pasta `server` e adicione as seguintes variáveis:
    - Execute os testes com:
    SECRET_KEY=chave-secreta-django-app
    DEBUG=True
    DATABASE_NAME=restaurant_db
    DATABASE_USER=seu_usuario
    DATABASE_PASSWORD=sua_senha
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    STRIPE_SECRET_KEY=sua_stripe_key_secreta
    STRIPE_PUBLIC_KEY=sua_stripe_key_publica
    FRONTEND_URL=frontend-url-prod

##**Testes**
    ```bash
    python manage.py test
    ```