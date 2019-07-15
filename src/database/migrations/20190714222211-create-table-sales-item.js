module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sales_items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    code: {
      allowNull: false,
      type: Sequelize.STRING,
      references: {
        model: 'items',
        key: 'code',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    price: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    quantity: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    sales_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'sales_orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('sales_items'),
};
