const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/backapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir('./src/models');

//primeira rota
app.use('/api', require('./src/routes'));

app.listen(3000);
