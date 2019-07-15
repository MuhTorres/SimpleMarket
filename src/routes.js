const express = require('express');
const UserController = require('./app/controllers/UserController');
const SalesOrderController = require('./app/controllers/SalesOrderController');
const ItemController = require('./app/controllers/ItemController');
const Middleware = require('./app/middlewares/Auth');

const routes = express.Router();

routes.post('/users', UserController.create);

routes.post('/login', UserController.authorize);
routes.get('/users', Middleware, UserController.list);
routes.get('/users/:id', Middleware, UserController.get);
routes.put('/users/:id', Middleware, UserController.update);
routes.delete('/users/:id', Middleware, UserController.destroy);

routes.get('/sales', Middleware, SalesOrderController.list);
routes.get('/sales/:id', Middleware, SalesOrderController.get);
routes.post('/sales', Middleware, SalesOrderController.create);
routes.put('/sales/:id', Middleware, SalesOrderController.update);
routes.delete('/sales/:id', Middleware, SalesOrderController.destroy);

routes.get('/items', Middleware, ItemController.list);
routes.get('/items/:id', Middleware, ItemController.get);
routes.post('/items', Middleware, ItemController.create);
routes.put('/items/:id', Middleware, ItemController.update);
routes.delete('/items/:id', Middleware, ItemController.destroy);

module.exports = routes;
