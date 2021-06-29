const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Option.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        content: DataTypes.STRING,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Option",
        tableName: 'options',
    });
    return Option;
};