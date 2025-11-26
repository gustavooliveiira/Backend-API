const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const url = '/eventos'

let id = null;
let token = null;

describe('Testes do recurso /eventos', ()=>{
test('POST /eventos', async ()=> {
    const response = await request.post(url).send({
        nome: "churrasquinho",
        data: "2025-11-26"
    });

    // Só deixa os expect depois
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe('churrasquinho');

    id = response.body._id;
});
    test('POST /eventos', async ()=>{
        const response = await request.post(url).send({})
        expect(response.status).toBe(422);
        expect(response.body.msg).toMatch('Nome e Data são obrigatórios');
    });
    test('POST /eventos/login espera 200', async ()=>{
        const response = await request.post(`${url}/login`).send({
             "nome": "churrasquinho", 
             "data": "26/11/2025"
        })
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST /eventos/login espera 401', async ()=>{
        const response = await request.post(`${url}/login`).send({})
        expect(response.status).toBe(401);
        expect(response.body.msg).toMatch('Credenciais inválidas');
    });
    test('POST /eventos/renovar espera 200', async ()=>{
        const response = await request.post(`${url}/renovar`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST /eventos/renovar espera 401', async ()=>{
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
        expect(response.body.nome).toBe("churrasquinho");
    });
    
    test('GET / id deve retornar 400', async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('GET / id deve retornar 404', async () => {
        const response = await request.get(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Evento não encontrado");
    });

    test('PUT / id deve retornar 200', async () => {
        const response = await request.put(`${url}/${id}`).set("authorization",`Bearer ${token}`).send({nome: "churrasquinho", 
            data: "26/11/2025" });
        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("churrasquinho");
        expect(response.body.data).toBe("26/11/2025")
    });

    test('PUT / id deve retornar 400', async () => {
        const response = await request.put(`${url}/0`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("ID inválido");
    });

    test('PUT / id deve retornar 404', async () => {
        const response = await request.put(`${url}/000000000000000000000000`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Evento não encontrado");
    });

    test('PUT / id deve retornar 422', async () => {
        const response = await request.put(`${url}/${id}`).set("authorization", `Bearer ${token}`).send({nome: "", data: true});
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("nome do evento é obrigatorio")
    });
    test('DELETE /eventos/${id}', async ()=>{
        const response = await request.delete(`${url}/${id}`).set("authorization",`Bearer ${token}`);
        expect(response.status).toBe(204);   
    });
})