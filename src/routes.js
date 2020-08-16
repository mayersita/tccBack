// import StoryController from './app/controllers/StoryController';
// import UserController from './app/controllers/UserController';
// import CommentsController from './app/controllers/CommentsController';
// import SessionController from './app/controllers/SessionController';

const express = require('express');
const validate = require('express-validation');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

const controllers = require('./app/controllers');
const validators = require('./app/validators');

routes.get('/stories', controllers.StoryController.index);
routes.get('/stories/:id', controllers.StoryController.show);
routes.post('/stories', controllers.StoryController.store);
routes.put('/stories/:id', controllers.StoryController.update);
routes.delete('/stories/:id', controllers.StoryController.destroy);

routes.get('/users', controllers.UserController.index);
routes.get('/users/:id', controllers.UserController.show);
routes.post('/users', controllers.UserController.store);
routes.put('/users/:id', controllers.UserController.update);
routes.delete('/users/:id', controllers.UserController.destroy);

routes.post('/sessions', controllers.SessionController.store);

routes.get('/comments', controllers.CommentsController.index);
routes.get('/comments/:id', controllers.CommentsController.show);
routes.post('/comments', controllers.CommentsController.store);
routes.put('/comments/:id', controllers.CommentsController.update);
routes.delete('/comments/:id', controllers.CommentsController.destroy);

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }));

module.exports = routes;
