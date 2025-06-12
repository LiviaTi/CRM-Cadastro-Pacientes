const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();

app.use(cors(
    // origin: 'https://www.sit.com.br';
));
app.use(express.json());
/*
    Rota/ Recurso

    Métodos HTTPS
    GET: Buscar/Listar uma informação do back-end
    PUSH: Criar uma informação no back-end
    PUT: Alterar informação no back-end
    DELETE: Deletar uma informação do back-end

    Tipos de paramêtros:
    Query: Parâmetros nomeados enviados na roa após o "?" (filtos,paginação)
    Route Params: Prâmetros utilizados para identificar recursos
    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos

    Banco de Dados
    SQL: MySQL, SQLite, PstgreSQL, Oracle, Microsoft SQL Server
    noSQL: MongoDB, CouchDB

    Como comunicar o back-end com o banco de daodos
    Driver: SELECT * FROM users
    Query Builder: table('users').select('*').where()
    */

app.use(routes);
app.listen(3333); //3333 melhor porta para JS
