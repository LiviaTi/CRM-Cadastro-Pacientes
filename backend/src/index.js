const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const allowedOrigins = [
  'https://crm-production-app-aa858b59d6e5.herokuapp.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(routes);


app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});