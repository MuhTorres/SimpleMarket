module.exports = (Sequelize, DataTypes) => {
  const Item = Sequelize.define('Item', {
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
  });
  return Item;
};
