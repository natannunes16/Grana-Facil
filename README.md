# 💸 GranaFácil

O **GranaFácil** é uma aplicação web de gestão financeira pessoal desenvolvida para facilitar o controle das finanças. A plataforma permite cadastrar e acompanhar **entradas e saídas**, organizar movimentações por **categorias**, gerenciar **contas e orçamentos** e visualizar informações financeiras por meio de **dashboards e relatórios**.

## 🚀 Tecnologias

### Frontend

* **React**
* **Vite**
* **React Router**
* **Axios**
* **Apollo Client**
* **Lucide React**
* **CSS**

### Backend

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **GraphQL**
* **Apollo Server**
* **JWT**
* **bcryptjs**
* **dotenv**

## 📁 Estrutura

```text
Grana-Facil/
├── frontend/    # Interface da aplicação
└── backend/     # API, autenticação e banco de dados
```

## 🛠️ Como executar

### Pré-requisitos

* **Node.js** instalado
* **MongoDB** disponível
* **Git** instalado

### 1. Clone o repositório

```bash
git clone https://github.com/natannunes16/Grana-Facil.git
cd Grana-Facil
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`:

```env
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
PORT=5000
```

Depois, inicie o servidor:

```bash
npm run dev
```

O backend será executado em:

```text
http://localhost:5000
```

### 3. Execute o Frontend

Abra outro terminal na pasta raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação e **bcryptjs** para proteção das senhas. Os recursos protegidos exigem um token de autenticação válido.

## 📊 Funcionalidades

* Cadastro e login de usuários
* Gerenciamento de contas
* Cadastro de entradas e saídas
* Categorias personalizadas
* Controle de orçamentos
* Dashboard financeiro
* Relatórios e indicadores
* Filtros de movimentações
* API REST
* API GraphQL
* Controle de acesso por usuário

---

## 🧪 Testes da API REST com Postman

Os testes abaixo permitem verificar o funcionamento da API REST, a persistência dos dados no MongoDB e as operações de CRUD.

### URL Base

```text
http://localhost:5000/api
```

Após realizar o login, utilize o **Token JWT** na aba **Authorization → Bearer Token** das demais requisições.

### 1. Login

**POST**

```text
http://localhost:5000/api/auth/login
```

**Authorization:** Nenhuma

**Body → raw → JSON:**

```json
{
  "email": "jorge.moares@exemplo.com",
  "password": "senha123"
}
```

**Resultado esperado:** `200 OK`

Copie o valor de `token` retornado e utilize-o como **Bearer Token** nas próximas requisições.

### 2. Criar Categoria

**POST**

```text
http://localhost:5000/api/categorias
```

**Authorization:** Bearer Token

**Body → raw → JSON:**

```json
{
  "name": "Alimentação Saudável",
  "type": "Despesa",
  "icon": "🍎"
}
```

**Resultado esperado:** `201 Created`

Copie o `_id` retornado para utilizar nos próximos testes.

### 3. Criar Conta

**POST**

```text
http://localhost:5000/api/contas
```

**Authorization:** Bearer Token

**Body → raw → JSON:**

```json
{
  "name": "Nubank",
  "type": "Conta Corrente",
  "balance": 1000
}
```

**Resultado esperado:** `201 Created`

Copie o `_id` da conta.

### 4. Criar Transação

**POST**

```text
http://localhost:5000/api/transacoes
```

**Authorization:** Bearer Token

**Body → raw → JSON:**

Substitua os IDs pelos valores obtidos anteriormente.

```json
{
  "description": "Feira da semana",
  "value": 150,
  "type": "out",
  "date": "2026-09-08T00:00:00.000Z",
  "category": "<ID_DA_CATEGORIA>",
  "account": "<ID_DA_CONTA>",
  "paymentMethod": "Crédito"
}
```

**Resultado esperado:** `201 Created`

A saída de R$ 150,00 deve reduzir o saldo da conta de:

```text
R$ 1.000,00 → R$ 850,00
```

Copie o `_id` da transação.

### 5. Listar Transações

**GET**

```text
http://localhost:5000/api/transacoes
```

**Authorization:** Bearer Token

**Body:** Nenhum

**Resultado esperado:** `200 OK`

Deve retornar as transações cadastradas no banco de dados.

### 6. Editar Transação

**PUT**

```text
http://localhost:5000/api/transacoes/<ID_DA_TRANSACAO>
```

**Authorization:** Bearer Token

**Body → raw → JSON:**

```json
{
  "value": 200,
  "description": "Feira completa"
}
```

**Resultado esperado:** `200 OK`

A transação deve ser atualizada e o saldo da conta recalculado corretamente.

### 7. Excluir Transação

**DELETE**

```text
http://localhost:5000/api/transacoes/<ID_DA_TRANSACAO>
```

**Authorization:** Bearer Token

**Body:** Nenhum

**Resultado esperado:** `200 OK`

A transação deve ser removida e seu impacto no saldo da conta deve ser desfeito.

### 8. Testar CRUD de Orçamento

**Criar — POST**

```text
http://localhost:5000/api/orcamentos
```

```json
{
  "limit": 500,
  "period": "2026-09",
  "category": "<ID_DA_CATEGORIA>"
}
```

**Listar — GET**

```text
http://localhost:5000/api/orcamentos
```

**Editar — PUT**

```text
http://localhost:5000/api/orcamentos/<ID_DO_ORCAMENTO>
```

```json
{
  "limit": 700
}
```

**Excluir — DELETE**

```text
http://localhost:5000/api/orcamentos/<ID_DO_ORCAMENTO>
```

**Resultado esperado:** criação, consulta, alteração e exclusão realizadas com sucesso.

### 9. Listar Contas

**GET**

```text
http://localhost:5000/api/contas
```

**Authorization:** Bearer Token

**Resultado esperado:** `200 OK`

Deve retornar as contas cadastradas pelo usuário.

### Observação

Os testes demonstram o funcionamento da API REST e permitem verificar as operações de:

**Criar → Consultar → Alterar → Excluir**

Também é possível verificar a persistência dos dados no **MongoDB** e o funcionamento das regras de negócio, como a atualização do saldo da conta após uma transação.

---

**GranaFácil — Controle financeiro pessoal de forma simples e organizada.**
