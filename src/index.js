const app = require('./server');
// // primeira rota
app.use('/api', require('./routes'));

app.listen(3000);
