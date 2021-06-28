"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car_Type.init(
    {
      name: DataTypes.STRING,
      hide: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Car_Type",
    }
  );
  return Car_Type;
};
