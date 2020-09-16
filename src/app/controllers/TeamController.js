import mongoose from 'mongoose';

const Team = require('../models/Team');

class TeamController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const filters = {};

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i');
    }

    const teams = await Team.paginate(filters, {
      page,
      limit: 10,
      sort: '-createdAt',
      populate: ['leader', 'users'],
    });

    return res.json(teams);
  }

  async show(req, res) {
    const team = await Team.findById(req.params.id);

    return res.json(team);
  }

  async store(req, res) {
    const team = await Team.create({
      ...req.body,
      leader: req.userId,
      users: req.userId,
    });

    return res.json(team);
  }

  async includeUserByCode(req, res) {
    const team = await Team.findOne(req.body.code);
    if (!team) {
      return res.status(400).json({ error: 'Team not found' });
    }
    const updateTeam = await Team.findByIdAndUpdate(team._id, {
      $push: {
        users: req.userId,
      },
    });

    return res.json(updateTeam);
  }

  async update(req, res) {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(team);
  }

  async destroy(req, res) {
    await Team.findByIdAndRemove(req.params.id);

    return res.send();
  }
}
module.exports = new TeamController();
