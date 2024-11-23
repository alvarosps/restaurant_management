# Frontend - Restaurant Management System

Este é o frontend do sistema de gerenciamento de restaurantes. Ele é desenvolvido com React, TypeScript e TailwindCSS.

## **Pré-requisitos**
- Node.js (v18 ou superior)
- npm (para gerenciamento de pacotes)

---

## **Instalação**

1. Navegue até a pasta `client`:
   ```bash
   cd client
   ```

2. Instale as dependências
    ```bash
    npm install
    ```

3. Configure o ambiente:
    - Crie um arquivo `.env` na pasta `client` com o seguinte conteúdo (ajuste conforme necessário):
    VITE_CURRENT_ENV=local

4. Inicie o servidor de desenvolvimento
    ```bash
    npm run dev
    ```

5. Acesso o aplicativo:
    - O Frontend estará disponível em http://localhost:3000

##**Scripts Disponíveis**
- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Compila o aplicativo para produção.
- `npm run lint`: Executa o ESLint para verificar problemas de lint.
- `npm run lint:fix`: Corrige automaticamente os problemas detectados pelo ESLint.
- `npm run test`: Executa os testes configurados com Jest.

##**Estrutura do Projeto**
- **src/**: Contém o código-fonte principal do frontend.
- **components/**: Componentes reutilizáveis como botões e gráficos.
- **pages/**: Páginas específicas da aplicação.
- **services/**: Gerenciamento de chamadas API.

##**Testes**
- Execute os testes com:
    ```bash
    npm run test
    ```