const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

const cors = require('cors');

const allowedOrigins = [
  'https://crm-production-app-aa858b59d6e5.herokuapp.com',
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, 
}));

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
