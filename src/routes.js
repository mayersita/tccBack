const express = require('express');
// const { validate, Joi } = require('express-validation');
const handle = require('express-async-handler');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

const controllers = require('./app/controllers');
// const validators = require('./app/validators');
routes.post('/users', handle(controllers.UserController.store));
routes.post('/sessions', handle(controllers.SessionController.store));

// routes.use(authMiddleware);
routes.get(
  '/stories',
  authMiddleware,
  handle(controllers.StoryController.index)
);
routes.get(
  '/stories/:id',
  authMiddleware,
  handle(controllers.StoryController.show)
);

routes.post(
  '/stories/user',
  authMiddleware,
  handle(controllers.StoryController.listStoriesByUser)
);

routes.get(
  '/stories/team/:team',
  authMiddleware,
  handle(controllers.StoryController.listStoriesByTeam)
);

routes.post(
  '/stories',
  authMiddleware,
  handle(controllers.StoryController.store)
);

routes.put(
  '/stories/:id',
  authMiddleware,
  handle(controllers.StoryController.update)
);
routes.delete(
  '/stories/:id',
  authMiddleware,
  handle(controllers.StoryController.destroy)
);

routes.get('/users', authMiddleware, handle(controllers.UserController.index));
routes.get(
  '/users/:id',
  authMiddleware,
  handle(controllers.UserController.show)
);
routes.post('/users', authMiddleware, handle(controllers.UserController.store));
routes.put(
  '/users/:id',
  authMiddleware,
  handle(controllers.UserController.update)
);
routes.delete(
  '/users/:id',
  authMiddleware,
  handle(controllers.UserController.destroy)
);

routes.post(
  '/comments/story/:story',
  authMiddleware,
  handle(controllers.CommentsController.index)
);
routes.get(
  '/comments/:id',
  authMiddleware,
  handle(controllers.CommentsController.show)
);
routes.post(
  '/comments',
  authMiddleware,
  handle(controllers.CommentsController.store)
);
routes.put(
  '/comments/:id',
  authMiddleware,
  handle(controllers.CommentsController.update)
);
routes.delete(
  '/comments/:id',
  authMiddleware,
  handle(controllers.CommentsController.destroy)
);

routes.get('/teams', authMiddleware, handle(controllers.TeamController.index));

routes.get(
  '/teams/:id',
  authMiddleware,
  handle(controllers.TeamController.show)
);

routes.post('/teams', authMiddleware, handle(controllers.TeamController.store));

routes.put(
  '/teams/:code',
  authMiddleware,
  handle(controllers.TeamController.includeUserByCode)
);

routes.post(
  '/teams/byUser',
  authMiddleware,
  handle(controllers.TeamController.findTeamByUser)
);

routes.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});

module.exports = routes;
