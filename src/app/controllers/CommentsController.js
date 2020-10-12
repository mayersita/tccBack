const mongoose = require('mongoose');

const Comments = require('../models/Comments');
const Story = require('../models/Story');

class CommentsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const comments = await Comments.paginate(
      { story: req.params.story },
      { page, limit: 10, populate: ['user'] }
    );

    return res.json(comments);
  }

  async show(req, res) {
    const comment = await Comments.findById(req.params.id);

    return res.json(comment);
  }

  async store(req, res) {
    const comment = await Comments.create({ ...req.body, user: req.userId });

    const story = await Story.findById(req.body.story);
    if (!story) {
      return res.status(400).json({ error: 'Story not found' });
    }
    await Story.findByIdAndUpdate(story._id, {
      $push: {
        comments: comment,
      },
    });

    return res.json(comment);
  }

  async update(req, res) {
    const comment = await Comments.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(comment);
  }

  async destroy(req, res) {
    await Comments.findByIdAndRemove(req.params.id);

    return res.send();
  }
}
module.exports = new CommentsController();
