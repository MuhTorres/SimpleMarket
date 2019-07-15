const { Item } = require('../models');

class ItemController {
  async list(req, res) {
    const response = await Item.findAll();
    res.send(response);
  }

  async create(req, res) {
    const response = await Item.create(req.body);
    res.send(response);
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await Item.findByPk(id);

    res.send(response);
  }

  async update(req, res) {
    const { id } = req.params;

    const modelData = await Item.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');

    await modelData.update(req.body);

    return res.send(modelData.get());
  }

  async destroy(req, res) {
    const { id } = req.params;

    const modelData = await Item.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');

    await modelData.destroy();

    return res.sendStatus(200);
  }
}

module.exports = new ItemController();
