const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OilExportReport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OilExportReport.belongsTo(models.OilType, {
                foreignKey: "oilTypeId",
                targetKey: "id",
            });
            OilExportReport.belongsTo(models.Unit, {
                foreignKey: "unitId",
                targetKey: "id",
            });
            OilExportReport.belongsTo(models.Project, {
                foreignKey: "projectId",
                targetKey: "id",
            });
            OilExportReport.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
        }
    }
    OilExportReport.init(
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
            modelName: "OilExportReport",
            tableName: "oil_export_reports",
        }
    );
    return OilExportReport;
};
