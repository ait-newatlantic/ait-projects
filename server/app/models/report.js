const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Report.belongsTo(models.Vehicle, {
                foreignKey: "vehicleId",
                targetKey: "id",
            });
            Report.belongsTo(models.Unit, {
                foreignKey: "unitId",
                targetKey: "id",
            });
            Report.belongsTo(models.Project, {
                foreignKey: "projectId",
                targetKey: "id",
            });
            Report.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
        }
    }
    Report.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        damageDate: DataTypes.DATE,
        damageContent: DataTypes.STRING,
        fixDate: DataTypes.DATE,
        fixContent: DataTypes.STRING,
        sparePartCode: DataTypes.STRING,
        sparePartName: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        fixCrew: DataTypes.STRING,
        price: DataTypes.INTEGER,
        note: DataTypes.STRING,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Report",
        tableName: 'reports',
    });
    return Report;
};