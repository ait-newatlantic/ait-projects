"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      address: DataTypes.STRING,
      manager: DataTypes.STRING,
      manager_number: DataTypes.STRING,
      manager_email: DataTypes.STRING,
      taxcode: DataTypes.STRING,
      hide: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
