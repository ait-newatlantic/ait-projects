"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Vehicle extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Vehicle.belongsToMany(models.User, {
                through: "user_vehicles",
                foreignKey: "vehicleId",
                otherKey: "userId",
            });
            Vehicle.belongsTo(models.Project, {
                foreignKey: "projectId",
                targetKey: "id",
            });
        }
    }
    Vehicle.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            code: DataTypes.TEXT,
            registryDate: DataTypes.STRING,
            createdYear: DataTypes.INTEGER,
            plateNumber: DataTypes.STRING,
            isWorking: DataTypes.BOOLEAN,
            description: DataTypes.STRING,
            hide: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Vehicle",
            tableName: 'vehicles',
        }
    );
    return Vehicle;
};
