import express from 'express';

const app = express(); //criação da aplicação

app.get('/users', (request, response) => {
    return response.json({ message: 'Hello World' });
});

app.listen(3333); // localhost:3333


