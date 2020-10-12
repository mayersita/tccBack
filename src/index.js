const app = require('./server');
// // primeira rota
app.use('/api', require('./routes'));

app.listen(process.env.PORT || 3000);
