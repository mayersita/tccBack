const express = require('express');
const routes = express.Router();

const StoryController = require('./controllers/StoryController');
const UserController = require('./controllers/UserController');
const CommentsController = require('./controllers/CommentsController');

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

routes.get('/comments', CommentsController.index);
routes.get('/comments/:id', CommentsController.show);
routes.post('/comments', CommentsController.store);
routes.put('/comments/:id', CommentsController.update);
routes.delete('/comments/:id', CommentsController.destroy);

module.exports = routes;
