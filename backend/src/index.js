const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

const allowedOrigins = [
  'https://crm-production-app-aa858b59d6e5.herokuapp.com',
];

app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin) {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  }

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    return next();
  }

  return res.status(403).send(`CORS policy: Origin ${origin} not allowed`);
});

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