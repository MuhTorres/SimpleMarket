module.exports = (Sequelize, DataTypes) => {
  const SalesItem = Sequelize.define('SalesItem', {
    code: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
  });

  SalesItem.associate = (models) => {
    SalesItem.belongsTo(models.SalesOrder, {
      foreignKey: 'sales_id',
      as: 'sales',
    });
  };
  return SalesItem;
};
