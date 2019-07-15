module.exports = (Sequelize, DataTypes) => {
  const SalesOrder = Sequelize.define('SalesOrder', {
    description: DataTypes.STRING,
    date: DataTypes.DATE,
  });

  SalesOrder.associate = (models) => {
    SalesOrder.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  SalesOrder.associate = (models) => {
    SalesOrder.hasMany(models.SalesItem, {
      foreignKey: 'sales_id',
      as: 'items',
    });
  };
  return SalesOrder;
};
