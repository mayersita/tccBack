import StoryController from './app/controllers/StoryController';
import UserController from './app/controllers/UserController';
import CommentsController from './app/controllers/CommentsController';
import SessionController from './app/controllers/SessionController';

const express = require('express');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

routes.get('/stories', StoryController.index);
routes.get('/stories/:id', StoryController.show);
routes.post('/stories', StoryController.store);
routes.put('/stories/:id', StoryController.update);
routes.delete('/stories/:id', StoryController.destroy);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/sessions', SessionController.store);

routes.get('/comments', CommentsController.index);
routes.get('/comments/:id', CommentsController.show);
routes.post('/comments', CommentsController.store);
routes.put('/comments/:id', CommentsController.update);
routes.delete('/comments/:id', CommentsController.destroy);

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }));

module.exports = routes;
