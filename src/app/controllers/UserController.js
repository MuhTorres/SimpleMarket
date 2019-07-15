const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, SalesOrder } = require('../models');
const KEY = require('../middlewares/Key');

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
      res.status(400).json(us.password);
    }
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
