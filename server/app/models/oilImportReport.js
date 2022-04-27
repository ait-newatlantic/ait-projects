const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OilImportReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OilImportReport.belongsTo(models.OilType, {
        foreignKey: "oilTypeId",
        targetKey: "id",
      });
      OilImportReport.belongsTo(models.Unit, {
        foreignKey: "unitId",
        targetKey: "id",
      });
      OilImportReport.belongsTo(models.Project, {
        foreignKey: "projectId",
        targetKey: "id",
      });
      OilImportReport.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  OilImportReport.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      importDate: DataTypes.DATE,
      importPaper: DataTypes.STRING,
      code: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      supplier: DataTypes.STRING,
      note: DataTypes.STRING,
      hide: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "OilImportReport",
      tableName: "oil_import_reports",
    }
  );
  return OilImportReport;
};
