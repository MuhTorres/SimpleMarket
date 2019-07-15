const { SalesOrder, SalesItem } = require('../models');

class SalesOrderController {
  async list(req, res) {
    const response = await SalesOrder.findAll();
    res.send(response);
  }

  async create(req, res) {
    const response = await SalesOrder.create(req.body);
    const { id } = response;
    const { items } = req.body;
    if (items) {
      items.forEach((item) => {
        item.sales_id = id;
        SalesItem.create(item);
      });
    }
    res.send(response);
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

    await modelData.update(req.body);

    return res.send(modelData.get());
  }

  async destroy(req, res) {
    const { id } = req.params;

    const modelData = await SalesOrder.findByPk(id);

    if (!modelData) return res.status(400).send('Registro não encontrado');

    await modelData.destroy();
    SalesItem.destroy({
      tableName: 'sales_items',
      where: {
        sales_id: id,
      },
    });

    return res.sendStatus(200);
  }
}

module.exports = new SalesOrderController();
