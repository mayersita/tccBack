const mongoose = require('mongoose');

const Story = require('../models/Story');

class StoryController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const filters = {};

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i');
    }

    const stories = await Story.paginate(filters, {
      page,
      limit: 10,
      sort: '-createdAt',
      populate: ['author'],
    });

    return res.json(stories);
  }

  async show(req, res) {
    const story = await Story.findById(req.params.id);

    return res.json(story);
  }

  async store(req, res) {
    const story = await Story.create({ ...req.body, author: req.userId });

    return res.json(story);
  }

  async listStoriesByTeam(req, res) {
    const { page = 1 } = req.query;
    const stories = await Story.paginate(
      { team: req.params.team },
      {
        page,
        limit: 10,
        sort: '-createdAt',
        populate: ['comments', 'author'],
      }
    );

    return res.json(stories);
  }

  async listStoriesByUser(req, res) {
    const { page = 1 } = req.query;
    const stories = await Story.paginate(
      { author: req.body.user },
      {
        page,
        limit: 10,
        sort: '-createdAt',
        populate: ['comments', 'author'],
      }
    );
    return res.json(stories);
  }

  async update(req, res) {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(story);
  }

  async destroy(req, res) {
    await Story.findByIdAndRemove(req.params.id);

    return res.send();
  }
}
module.exports = new StoryController();
