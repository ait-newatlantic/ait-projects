const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Business_Type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Business_Type.hasMany(models.Customer, {
                foreignKey: "business_typeId",
                targetKey: "id",
            });
        }
    }
    Business_Type.init({
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
        modelName: "Business_Type",
        tableName: 'business_types',
    });
    return Business_Type;
};