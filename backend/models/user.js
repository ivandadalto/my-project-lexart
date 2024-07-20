const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static associate(models) {
  }
  
  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = (sequelize) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeSave', async (user) => {
    if (user.changed('password')) {
      user.password = await User.hashPassword(user.password);
    }
  });

  return User;
};
