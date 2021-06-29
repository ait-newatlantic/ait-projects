const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Demand_Status extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Demand_Status.hasMany(models.Demand, {
                foreignKey: "demand_statusId",
                targetKey: "id",
            });
            Demand_Status.hasMany(models.Demand_History, {
                foreignKey: "demand_statusId",
                targetKey: "id",
            });
        }
    }
    Demand_Status.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Demand_Status",
        tableName: 'demand_statuses',
    });
    return Demand_Status;
};