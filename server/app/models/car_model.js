const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Car_Model extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Car_Model.hasMany(models.Demand, {
                foreignKey: "car_modelId",
                targetKey: "id",
            });
            Car_Model.hasMany(models.Demand_History, {
                foreignKey: "car_modelId",
                targetKey: "id",
            });
        }
    }
    Car_Model.init({
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
        modelName: "Car_Model",
        tableName: 'car_models',
    });
    return Car_Model;
};