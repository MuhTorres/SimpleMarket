const { SalesOrder, SalesItem } = require('../models');
const models = require('../models');

class SalesOrderController {
  async list(req, res) {
    const response = await SalesOrder.findAll();
    res.send(response);
  }

  async create(req, res) {
    const { userId } = req;
    req.body.user_id = userId;
    const transaction = await models.sequelize.transaction();
    try {
      const response = await SalesOrder.create(req.body, { transaction });
      const { id } = response;
      const { items } = req.body;
      if (items) {
        items.forEach((item) => {
          item.sales_id = id;
          SalesItem.create(item, { transaction });
        });
      }
      transaction.commit();
      res.send(response);
    } catch (error) {
      transaction.rollback();
      res.send(error);
    }
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await SalesOrder.findByPk(id, {
      include: [{ model: SalesItem, as: 'items' }],
    });

    res.send(response);
  }

  async update(req, res) {
    const { id } = req.params;

    const modelData = await SalesOrder.findByPk(id);

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

    const modelData = await SalesOrder.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');

    const transaction = await models.sequelize.transaction();
    try {
      await modelData.destroy({ transaction });
      SalesItem.destroy({
        transaction,
        tableName: 'sales_items',
        where: {
          sales_id: id,
        },
      });
      transaction.commit();
      return res.sendStatus(200);
    } catch (error) {
      transaction.rollback();
      return res.status(500).json(error);
    }
  }
}

module.exports = new SalesOrderController();
