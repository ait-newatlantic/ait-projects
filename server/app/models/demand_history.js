"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Demand_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Demand_History.init(
    {
      quantity: DataTypes.INTEGER,
      date: DataTypes.DATE,
      note: DataTypes.STRING,
      employee: DataTypes.STRING,
      opinion: DataTypes.STRING,
      meeting: DataTypes.STRING,
      hide: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Demand_History",
    }
  );
  return Demand_History;
};
