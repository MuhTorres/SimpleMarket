const JWT = require('jsonwebtoken');
const { User, SalesOrder } = require('../models');
const KEY = require('../middlewares/Key');
const models = require('../models');

class UserController {
  async list(req, res) {
    const response = await User.findAll();
    res.send(response);
  }

  async authorize(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const us = await User.findOne({
      where: {
        email,
      },
      attributes: ['name', 'email', 'id', 'password'],
    });

    if (us && us.checkPassword(password)) {
      const token = JWT.sign({ userId: us.id }, KEY.tokenKey);
      req.user = {
        userId: us.id,
        email: us.email,
        token,
      };
      res.status(200).json(req.user);
    } else {
      res.status(400).send('Usuario não encontrado');
    }
  }

  async create(req, res) {
    const transaction = await models.sequelize.transaction();
    try {
      const response = await User.create(req.body, { transaction });
      transaction.commit();
      res.send(response);
    } catch (error) {
      transaction.rollback();
      res.send(error);
    }
  }

  async get(req, res) {
    const { id } = req.params;

    const response = await User.findByPk(id, {
      include: [
        {
          model: SalesOrder,
          as: 'sales_orders',
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

    const modelData = await User.findByPk(id);

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

module.exports = new UserController();
