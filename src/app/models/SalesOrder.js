module.exports = (Sequelize, DataTypes) => {
  const SalesOrder = Sequelize.define('SalesOrder', {
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    total: DataTypes.FLOAT,
  });

  SalesOrder.associate = (models) => {
    SalesOrder.hasMany(models.SalesItem, {
      foreignKey: 'sales_id',
      as: 'items',
    });
  };
  return SalesOrder;
};
