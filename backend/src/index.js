const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

const allowedOrigins = [
  'https://crm-production-app-aa858b59d6e5.herokuapp.com',
];

app.use((req, res, next) => {
  console.log('Origin recebida:', req.headers.origin);
  next();
});

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `A política CORS bloqueou o acesso da origem ${origin}.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
}));

app.options('*', cors());

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
