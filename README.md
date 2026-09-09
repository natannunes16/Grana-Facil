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

**GranaFácil — Controle financeiro pessoal de forma simples e organizada.**
