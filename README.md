# Backend-API: Sistema de Registro de Presenças

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.16+-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0+-13aa52?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-Auth-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

API RESTful para gerenciar registros de presenças com autenticação JWT e MongoDB.

</div>

---

## 📋 Sobre o Projeto

 API REST desenvolvida em **Node.js com Express** para gerenciar registros de presenças de usuários. O sistema implementa funcionalidades completas de **CRUD** (Create, Read, Update, Delete), **autenticação com JWT** e **validação de dados**.

### ✨ Principais Características

- ✅ API RESTful com CRUD completo
- ✅ Autenticação segura com JWT (JSON Web Tokens)
- ✅ Renovação automática de tokens
- ✅ Banco de dados MongoDB
- ✅ Middleware de autenticação
- ✅ Documentação interativa com Swagger/OpenAPI
- ✅ Hash seguro de senhas com bcrypt
- ✅ Testes unitários com Jest
- ✅ Variáveis de ambiente com dotenv

---

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Document Mapper)
- **JWT** - Autenticação e autorização
- **bcrypt** - Hash seguro de senhas

### Desenvolvimento e Testes
- **Jest** - Framework de testes
- **Supertest** - Testes HTTP
- **Nodemon** - Reload automático
- **Morgan** - Logger de requisições
- **Swagger UI Express** - Documentação interativa

---

## 📁 Estrutura do Projeto

```
presencas/
├── app.js                          # Configuração principal da aplicação
├── package.json                    # Dependências do projeto
├── swagger.yaml                    # Documentação OpenAPI
├── bin/
│   └── www                         # Entry point da aplicação
├── controllers/
│   └── presencasController.js     # Lógica de negócio
├── middlewares/
│   └── autentificacao.js          # Verificação de JWT
├── models/
│   └── presencaModel.js           # Schema do MongoDB
├── routes/
│   ├── apiDocsRoute.js            # Rota da documentação Swagger
│   └── presencasRouter.js         # Rotas da API
└── tests/
    └── presencasRouter.test.js    # Testes unitários
```

---

## 🚀 Guia de Instalação

### Pré-requisitos

- Node.js 18+ instalado
- MongoDB Atlas conta (ou MongoDB local instalado)
- Git instalado

### 1. Clonar o Repositório

```bash
git clone https://github.com/gustavooliveiira/Backend-API.git
cd Backend-API/presencas
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_USER=seu_usuario_mongodb
MONGODB_PASSWORD=sua_senha_mongodb
MONGODB_HOST=seu_cluster.mongodb.net
MONGODB_DATABASE=nome_do_banco
JWT_SECRET=sua_chave_secreta_jwt
PORT=3000
NODE_ENV=development
```

### 4. Iniciar o Servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor iniciará em `http://localhost:3000`

---

## 📚 Documentação da API

A API está documentada com **Swagger/OpenAPI 3.0** e pode ser acessada em:

```
http://localhost:3000/api-docs
```

### Endpoints Principais

#### 🔓 Autenticação (Público)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/presencas/login` | Realizar login e obter token JWT |
| `POST` | `/presencas/renovar` | Renovar token JWT (requer autenticação) |

#### 📋 Presenças

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/presencas` | Listar todas as presenças | ❌ |
| `GET` | `/presencas/:id` | Obter presença por ID | ❌ |
| `POST` | `/presencas` | Criar nova presença | ❌ |
| `PUT` | `/presencas/:id` | Atualizar presença | ✅ JWT |
| `DELETE` | `/presencas/:id` | Deletar presença | ✅ JWT |

---

## 💡 Exemplos de Uso

### 1. Login e Obtenção de Token

```bash
curl -X POST http://localhost:3000/presencas/login \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva"}'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Criar Presença

```bash
curl -X POST http://localhost:3000/presencas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "presenca": true,
    "data": "27/11/2025"
  }'
```

### 3. Listar Todas as Presenças

```bash
curl -X GET http://localhost:3000/presencas
```

### 4. Obter Presença por ID

```bash
curl -X GET http://localhost:3000/presencas/507f1f77bcf86cd799439011
```

### 5. Atualizar Presença (Autenticado)

```bash
curl -X PUT http://localhost:3000/presencas/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "presenca": false,
    "data": "28/11/2025"
  }'
```

### 6. Deletar Presença (Autenticado)

```bash
curl -X DELETE http://localhost:3000/presencas/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

---

## 🧪 Testes

Executar testes unitários:

```bash
npm test
```

Executar testes com cobertura:

```bash
npm test -- --coverage
```

Os testes estão localizados em `tests/presencasRouter.test.js`

---

## 📊 Modelo de Dados

### Schema: Presença

```javascript
{
  _id: ObjectId,              // ID único (MongoDB)
  nome: String,               // Nome obrigatório
  presenca: Boolean,          // Status de presença (opcional)
  data: String,              // Data em formato DD/MM/YYYY (padrão: data atual)
  __v: Integer               // Versão do documento
}
```

---

## 🔐 Autenticação e Segurança

- **JWT Bearer Token** para autenticação em endpoints protegidos
- **Bcrypt** para hash seguro de senhas
- **Middleware** de verificação de token em rotas protegidas
- **CORS e validação** de dados de entrada

### Como Usar o Token JWT

1. Faça login em `/presencas/login`
2. Copie o token retornado
3. Adicione o header em requisições protegidas:
   ```
   Authorization: Bearer seu_token_jwt_aqui
   ```

---

## 🐛 Solução de Problemas

### Erro de Conexão MongoDB
- Verifique se as credenciais no `.env` estão corretas
- Certifique-se de que o IP está whitelistado no MongoDB Atlas
- Confirme se o cluster está ativo

### Erro de Token Inválido
- Verifique se o token não expirou
- Use o endpoint `/presencas/renovar` para renovar o token
- Certifique-se de incluir "Bearer " antes do token

### Porta em Uso
- Mude a porta no `.env` para outra disponível (ex: 3001)

---

## 🔄 Branches

- `main` - Código estável em produção
- `develop` - Desenvolvimento principal
- `feature/4-registro-de-presenças` - Feature branch atual

---

## 📝 Commits Convencionais

Usamos o padrão de commits convencionais:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `test:` Testes
- `refactor:` Refatoração
- `style:` Formatação/estilo
- `chore:` Tarefas de manutenção

---

## 👥 Autores

**Gustavo Oliveira**
- GitHub: [@gustavooliveiira](https://github.com/gustavooliveiira)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma [issue](https://github.com/gustavooliveiira/Backend-API/issues) ou entre em contato através do GitHub.

---

**Desenvolvido com ❤️ usando Node.js e Express**
