const express = require('express');
const handle = require('express-async-handler');
const UserController = require('./app/controllers/UserController');
const SalesOrderController = require('./app/controllers/SalesOrderController');
const ItemController = require('./app/controllers/ItemController');
const Middleware = require('./app/middlewares/Auth');

const routes = express.Router();

routes.post('/users', handle(UserController.create));
routes.post('/login', handle(UserController.authorize));

routes.use(Middleware);

routes.get('/users', handle(UserController.list));
routes.get('/users/:id', handle(UserController.get));
routes.put('/users/:id', handle(UserController.update));
routes.delete('/users/:id', handle(UserController.destroy));

routes.get('/sales', handle(SalesOrderController.list));
routes.get('/sales/:id', handle(SalesOrderController.get));
routes.post('/sales', handle(SalesOrderController.create));
routes.put('/sales/:id', handle(SalesOrderController.update));
routes.delete('/sales/:id', handle(SalesOrderController.destroy));

routes.get('/items', handle(ItemController.list));
routes.get('/items/:id', handle(ItemController.get));
routes.post('/items', handle(ItemController.create));
routes.put('/items/:id', handle(ItemController.update));
routes.delete('/items/:id', handle(ItemController.destroy));

module.exports = routes;
