const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(routes);

// Serve React buildado
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
