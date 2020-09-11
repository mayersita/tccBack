const express = require('express');
// const { validate, Joi } = require('express-validation');
const handle = require('express-async-handler');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

const controllers = require('./app/controllers');
// const validators = require('./app/validators');
routes.post('/users', handle(controllers.UserController.store));
routes.post('/sessions', handle(controllers.SessionController.store));

routes.use(authMiddleware);
routes.get('/stories', handle(controllers.StoryController.index));
routes.get('/stories/:id', handle(controllers.StoryController.show));
routes.post('/stories', handle(controllers.StoryController.store));
routes.put('/stories/:id', handle(controllers.StoryController.update));
routes.delete('/stories/:id', handle(controllers.StoryController.destroy));

routes.get('/users', handle(controllers.UserController.index));
routes.get('/users/:id', handle(controllers.UserController.show));
routes.post('/users', handle(controllers.UserController.store));
routes.put('/users/:id', handle(controllers.UserController.update));
routes.delete('/users/:id', handle(controllers.UserController.destroy));

routes.get('/comments', handle(controllers.CommentsController.index));
routes.get('/comments/:id', handle(controllers.CommentsController.show));
routes.post('/comments', handle(controllers.CommentsController.store));
routes.put('/comments/:id', handle(controllers.CommentsController.update));
routes.delete('/comments/:id', handle(controllers.CommentsController.destroy));

routes.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

module.exports = routes;
