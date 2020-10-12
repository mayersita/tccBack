const mongoose = require('mongoose');

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
    const { code, name } = req.body;
    if (await Team.findOne({ code })) {
      return res.status(400).json({
        error: 'Esse código já existe! Por favor insira outro código.',
      });
    }

    if (await Team.findOne({ name })) {
      return res.status(400).json({ error: 'Esse nome já foi utilizado!' });
    }
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
    const userinTeam = await Team.find({
      users: { $in: [req.userId] },
    });
    if (userinTeam.length == 0) {
      const updateTeam = await Team.findByIdAndUpdate(team._id, {
        $push: {
          users: req.userId,
        },
      });

      return res.json(updateTeam);
    }
    return res.status(400).json({ error: 'User is already in a team' });
  }

  async findTeamByUser(req, res) {
    const team = await Team.find({
      users: { $in: [req.body.id] },
    });

    return res.json(team);
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
