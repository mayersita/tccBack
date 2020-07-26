import mongoose from 'mongoose';

const Story = require('../models/Story');

class StoryController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const stories = await Story.paginate({}, { page, limit: 10 });

    return res.json(stories);
  }

  async show(req, res) {
    const story = await Story.findById(req.params.id);

    return res.json(story);
  }

  async store(req, res) {
    const story = await Story.create(req.body);

    return res.json(story);
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
