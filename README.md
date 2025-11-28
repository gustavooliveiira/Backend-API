**📌 API REST – Sistema de Gestão de Eventos**
---

Este projeto consiste no desenvolvimento de uma API RESTful utilizando Node.js + Express, integrada ao MongoDB, com autenticação via JWT e documentação com Swagger (OpenAPI).
A API foi construída com base em boas práticas de desenvolvimento, seguindo os requisitos da disciplina.

**✔️ Integrantes do Grupo**
---

| Nome               | Responsabilidade                                 |
| ------------------ | ------------------------------------------------ |
| **Daniel Pacheco** | Implementação da rota e CRUD de **Voluntários**  |
| **Lucas**          | Implementação da rota e CRUD de **Presenças**    |
| **Gustavo**        | Implementação da rota e CRUD de **Eventos**      |
| **Samuel**         | Implementação da rota e CRUD de **Funcionários** |


**🛠️ Tecnologias Utilizadas**
---

- Node.js

- Express

- MongoDB + Mongoose

- JWT (jsonwebtoken)

- Swagger (OpenAPI)

- Jest

- Supertest

- Dotenv

- Nodemon


**🔧 Configuração do Ambiente**
----

**1️⃣ Clonar o Repositório**

Abra o terminal:
```bash
git clone https://github.com/gustavooliveiira/Backend-API.git
```
```bash
cd voluntarios
```

**2️⃣ Instalar Dependências**

```bash
npm install
```

**3️⃣ Arquivo .env**

Crie um arquivo .env na raiz do projeto contendo:

```bash
MONGODB_USER=usrTarefas
MONGODB_PASSWORD=abcd1234
MONGODB_HOST=cluster0.ajfevzi.mongodb.net
MONGODB_DATABASE=API
JWT_SECRET=segredo 
JWT_EXPIRES=60s
```

**▶️ Executar a Aplicação**

```bash
npm run dev
```
---

**📘 Documentação da API (Swagger)**
---
A API rodará em:
http://localhost:3000/api-docs

**🧪 Rodando os Testes**
---
Para executar todos os testes:

```bash
npm run test
```
Testes implementados com:

- Jest

- Supertest

As rotas protegidas são testadas com JWT válido.

---
**Esse processo de configuração de ambiente deve se repetir em todas as rotas de recursos**
---
