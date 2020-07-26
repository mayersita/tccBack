import requireDir from 'require-dir';
import mongoose from 'mongoose';
import app from './server';

// // primeira rota
app.use('/api', require('./routes'));

app.listen(3000);
