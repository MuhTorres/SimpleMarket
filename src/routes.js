const express = require('express');
const UserController = require('./app/controllers/UserController');
const SalesOrderController = require('./app/controllers/SalesOrderController');
const ItemController = require('./app/controllers/ItemController');

const routes = express.Router();

routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.get);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/sales', SalesOrderController.list);
routes.get('/sales/:id', SalesOrderController.get);
routes.post('/sales', SalesOrderController.create);
routes.put('/sales/:id', SalesOrderController.update);
routes.delete('/sales/:id', SalesOrderController.destroy);

routes.get('/items', ItemController.list);
routes.get('/items/:id', ItemController.get);
routes.post('/items', ItemController.create);
routes.put('/items/:id', ItemController.update);
routes.delete('/items/:id', ItemController.destroy);

module.exports = routes;
