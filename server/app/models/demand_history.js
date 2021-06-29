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
            Demand_History.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Customer, {
                foreignKey: "customerId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Customer_Type, {
                foreignKey: "customer_typeId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Car_Model, {
                foreignKey: "car_modelId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Car_Type, {
                foreignKey: "car_typeId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Color, {
                foreignKey: "colorId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Demand_Status, {
                foreignKey: "demand_statusId",
                targetKey: "id",
            });
            Demand_History.belongsTo(models.Contact_Type, {
                foreignKey: "contact_typeId",
                targetKey: "id",
            });
        }
    }
    Demand_History.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        quantity: DataTypes.INTEGER,
        date: DataTypes.DATE,
        note: DataTypes.STRING,
        employee: DataTypes.STRING,
        opinion: DataTypes.STRING,
        meeting: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
        customer_typeId: DataTypes.INTEGER,
        car_modelId: DataTypes.INTEGER,
        car_typeId: DataTypes.INTEGER,
        colord: DataTypes.INTEGER,
        demand_statusId: DataTypes.INTEGER,
        contact_typeId: DataTypes.INTEGER,
        demandId: DataTypes.INTEGER,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Demand_History",
        tableName: 'demand_histories',
    });
    return Demand_History;
};