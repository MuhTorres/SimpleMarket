module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('sales_orders', 'total', {
    allowNull: false,
    type: Sequelize.FLOAT,
    defaultValue: 0,
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('sales_orders', 'total'),
};
