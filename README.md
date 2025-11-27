# Backend-API: Sistema de Registro de Presenças

API RESTful para gerenciar registros de presenças com autenticação JWT e MongoDB.

## Tecnologias

- Node.js com Express
- MongoDB com Mongoose
- JWT para autenticação
- Jest para testes
- Swagger para documentação

## Instalação

```bash
git clone https://github.com/gustavooliveiira/Backend-API.git
cd Backend-API/presencas
npm install
```

Configure o arquivo `.env`:

```env
MONGODB_USER=seu_usuario
MONGODB_PASSWORD=sua_senha
MONGODB_HOST=seu_cluster.mongodb.net
MONGODB_DATABASE=presencas
JWT_SECRET=sua_chave_secreta
PORT=3000
```

## Executar

```bash
npm run dev
```

Acesse em `http://localhost:3000/api-docs`

## API Endpoints

| Método | Rota                 | Autenticação |
| ------ | -------------------- | ------------ |
| POST   | `/presencas/login`   | Não          |
| POST   | `/presencas/renovar` | Sim          |
| GET    | `/presencas`         | Não          |
| GET    | `/presencas/:id`     | Não          |
| POST   | `/presencas`         | Não          |
| PUT    | `/presencas/:id`     | Sim          |
| DELETE | `/presencas/:id`     | Sim          |

Documentação: `http://localhost:3000/api-docs`

## Testes

```bash
npm test
```

## Autor

Lucas Matos
