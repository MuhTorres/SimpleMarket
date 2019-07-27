const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        },
      },
    },
  );
  User.associate = (models) => {
    User.hasMany(models.SalesOrder, {
      foreignKey: 'user_id',
      as: 'sales_orders',
    });

    models.SalesOrder.belongsTo(User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  User.prototype.checkPassword = function (pwd) {
    return bcrypt.compareSync(pwd, this.password);
  };
  return User;
};
