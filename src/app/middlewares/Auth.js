const JWT = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).send('Favor, alterar o tipo de autenticação para Bearer e informar o token!');
  const token = authorization.split(' ')[1];

  JWT.verify(token, process.env.KEY, (err, payload) => {
    if (err) res.status(401).send('Token inválido!');
    else if (payload) {
      User.findByPk(payload.userId).then(() => {
        req.userId = payload.userId;
        next();
      });
    } else res.status(401).send('Falha ao autenticar o usuário!');
  });
};
