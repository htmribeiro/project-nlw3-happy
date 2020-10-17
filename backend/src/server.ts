import express from 'express';

const app = express(); //criação da aplicação

// Criaçao da Rota
// Recurso = users
// Método HTTP = GET, POST, PUT, DELETE

// GET = Buscar uma informação (Lista, Item)
// POST = Criando uma informação
// PUT = Editando uma informação
// DELETE = Deletando uma informação

// Parâmetros
// Query Params: http://localhost:3333/users?search=diego
// Route Params: DELETE http://localhost:3333/users/1 (identificar um recurso)
// Body: http://localhost:3333/users (identificar um recurso)

app.post('/users', (request, response) => {
    console.log(request.query)
    
    return response.json({ message: 'Hello World'  });
});

app.listen(3333); // localhost:3333


