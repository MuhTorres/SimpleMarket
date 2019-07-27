const express = require('express');
const Youch = require('youch');
const validate = require('express-validation');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.exception();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      const youch = new Youch(err);
      const detail = await youch.toJSON();

      return res.status(err.status || 500).json({
        error: {
          message: 'Erro interno',
          detail,
        },
      });
    });
  }
}

module.exports = new App().express;
