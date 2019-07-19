const { SalesOrder, SalesItem, User } = require('../models');

class SalesOrderController {
  async list(req, res) {
    const response = await SalesOrder.findAll();
    res.send(response);
  }

  async create(req, res) {
    const { userId } = req;
    const salesBody = req.body;
    salesBody.user_id = userId;
    const { items } = req.body;
    salesBody.total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const response = await SalesOrder.create(salesBody);
    const { id } = response;
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

    // MÉTODO 01 PARA TRAZER A ARVORE DE PEDIDO (USER - > PEDIDO - > ITEMS)
    const sales = await SalesOrder.findByPk(id);
    const response = await User.findOne({
      where: { id: sales.user_id },
      attributes: ['name'],
      include: [
        {
          model: SalesOrder,
          as: 'sales_orders',
          attributes: ['date', 'description', 'total'],
          where: { id: sales.id },
          include: [
            { model: SalesItem, as: 'items', attributes: ['id', 'code', 'price', 'quantity'] },
          ],
        },
      ],
    });

    // MÉTODO 02 PARA TRAZER A ARVORE DE PEDIDO (USER - > PEDIDO - > ITEMS)
    // const response = await SalesOrder.findByPk(id, {
    //   attributes: [
    //     ['date', 'Data da Venda'],
    //     ['description', 'Descrição da Venda'],
    //     ['total', 'Total do Documento'],
    //   ],
    //   include: [
    //     { model: User, as: 'user', attributes: [['name', 'Nome']] },
    //     {
    //       model: SalesItem,
    //       as: 'items',
    //       attributes: [
    //         ['code', 'Código do Item'],
    //         ['price', 'Preço de Venda'],
    //         ['quantity', 'Quantidade'],
    //       ],
    //     },
    //   ],
    // });

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
