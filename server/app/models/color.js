const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Color extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Color.hasMany(models.Demand, {
                foreignKey: "colorId",
                targetKey: "id",
            });
            Color.hasMany(models.Demand_History, {
                foreignKey: "colorId",
                targetKey: "id",
            });
        }
    }
    Color.init({
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
        modelName: "Color",
        tableName: 'colors',
    });
    return Color;
};