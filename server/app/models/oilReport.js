const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OilReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OilReport.belongsTo(models.OilType, {
        foreignKey: "oilTypeId",
        targetKey: "id",
      });
      OilReport.belongsTo(models.Unit, {
        foreignKey: "unitId",
        targetKey: "id",
      });
      OilReport.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  OilReport.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exportDate: DataTypes.DATE,
      exportPaper: DataTypes.STRING,
      amountBefore: DataTypes.INTEGER,
      amountAfter: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      trips: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      consumption: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      note: DataTypes.STRING,
      hide: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "OilReport",
      tableName: "oil_reports",
    }
  );
  return OilReport;
};
