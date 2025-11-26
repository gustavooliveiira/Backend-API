const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const url = '/voluntarios'

let id = null;
let token = null;

describe('/voluntarios', ()=>{
    test('POST /voluntarios', async ()=>{
        const response = await request.post(url).send({
            "email": "voluntario@email.com", 
            "senha": "abcd1234" 
        });
        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toMatch('voluntario@email.com');
        id = response.body._id;        
    });
    test('POST /voluntarios', async ()=>{
        const response = await request.post(url).send({})
        expect(response.status).toBe(422);
        expect(response.body.msg).toMatch('Email e Senha são obrigatórios');
    });
    test('POST /voluntarios/login espera 200', async ()=>{
        const response = await request.post(`${url}/login`).send({
             "email": "voluntario@email.com", 
             "senha": "abcd1234"
        })
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST /voluntarios/login espera 401', async ()=>{
        const response = await request.post(`${url}/login`).send({})
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Credenciais inválidas');
    });
    test('POST /voluntarios/renovar espera 200', async ()=>{
        const response = await request.post(`${url}/renovar`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST /voluntarios/renovar espera 401', async ()=>{
        const response = await request.post(`${url}/renovar`).set("authorization",`Bearer 123456789`);
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Token inválido');
    });
    test('GET / deve retornar 200', async () => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true)
    });

    test('GET / id deve retornar 200', async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toBe("voluntario@email.com");
        expect(response.body.senha).toBe("abcd1234");
    });
    
    test('GET / id deve retornar 400', async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('GET / id deve retornar 404', async () => {
        const response = await request.get(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Voluntario nao encontrado!");
    });

    test('PUT / id deve retornar 200', async () => {
        const response = await request.put(`${url}/${id}`).send({email: "voluntario@email.com", 
            senha: "abcd1234" });
        expect(response.status).toBe(200);
        expect(response.body.email).toBe("voluntario@email.com");
        expect(response.body.senha).toBe("abcd1234")
    });

    test('PUT / id deve retornar 400', async () => {
        const response = await request.put(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('PUT / id deve retornar 404', async () => {
        const response = await request.put(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Voluntario nao encontrado");
    });

    test('PUT / id deve retornar 422', async () => {
        const response = await request.put(`${url}/${id}`).send({email: "", senha: true});
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("email do voluntario é obrigatorio")
    });
    test('DELETE /voluntarios/${id}', async ()=>{
        const response = await request.delete(`${url}/${id}`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(204);   
    });
})