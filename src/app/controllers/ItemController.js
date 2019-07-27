const { Item } = require('../models');
const models = require('../models');

class ItemController {
  async list(req, res) {
    const response = await Item.findAll();
    res.send(response);
  }

  async create(req, res) {
    const transaction = await models.sequelize.transaction();
    try {
      const response = await Item.create(req.body, { transaction });
      transaction.commit();
      res.send(response);
    } catch (error) {
      transaction.rollback();
      res.send(error);
    }
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

    const transaction = await models.sequelize.transaction();
    try {
      await modelData.update(req.body, { transaction });
      transaction.commit();
    } catch (error) {
      transaction.rollback();
    }

    return res.send(modelData.get());
  }

  async destroy(req, res) {
    const { id } = req.params;

    const modelData = await Item.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');
    const transaction = await models.sequelize.transaction();
    try {
      await modelData.destroy({ transaction });
      transaction.commit();
      return res.sendStatus(200);
    } catch (error) {
      transaction.rollback();
      return res.status(500).json(error);
    }
  }
}

module.exports = new ItemController();
