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
            Car_Type.hasMany(models.Demand, {
                foreignKey: "car_typeId",
                targetKey: "id",
            });
            Car_Type.hasMany(models.Demand_History, {
                foreignKey: "car_typeId",
                targetKey: "id",
            });
        }
    }
    Car_Type.init({
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
        modelName: "Car_Type",
        tableName: 'car_types',
    });
    return Car_Type;
};