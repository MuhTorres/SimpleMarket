const { User, SalesOrder, SalesItem } = require('../models');

class UserController {
  async list(req, res) {
    const response = await User.findAll();
    res.send(response);
  }

  async create(req, res) {
    const response = await User.create(req.body);
    res.send(response);
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await User.findByPk(id, {
      include: [
        {
          model: SalesOrder,
        },
      ],
      attributes: ['id', 'name', 'email'],
    });

    res.send(response);
  }

  async update(req, res) {
    const { id } = req.params;

    const modelData = await User.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');

    await modelData.update(req.body);

    return res.send(modelData.get());
  }

  async destroy(req, res) {
    const { id } = req.params;

    const modelData = await User.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');

    await modelData.destroy();

    return res.sendStatus(200);
  }
}

module.exports = new UserController();
