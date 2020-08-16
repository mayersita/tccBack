const User = require('../models/User');

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const users = await User.paginate(
      {},
      { page, limit: 10, sort: '-createdAt' }
    );

    return res.json(users);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  }

  async store(req, res) {
    const { email } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(user);
  }

  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);

    return res.send();
  }
}

module.exports = new UserController();
