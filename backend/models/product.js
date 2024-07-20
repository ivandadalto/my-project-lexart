const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static associate(models) {
  }
}

module.exports = (sequelize) => {
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};