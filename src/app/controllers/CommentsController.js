const mongoose = require('mongoose');

const Comments = require('../models/Comments');

class CommentsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const comments = await Comments.paginate({}, { page, limit: 10 });

    return res.json(comments);
  }

  async show(req, res) {
    const comment = await Comments.findById(req.params.id);

    return res.json(comment);
  }

  async store(req, res) {
    const comment = await Comments.create({ ...req.body, idUser: req.userId });

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
