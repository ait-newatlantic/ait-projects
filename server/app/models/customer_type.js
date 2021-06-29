const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Customer_Type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer_Type.hasMany(models.Demand, {
                foreignKey: "customer_typeId",
                targetKey: "id",
            });
            Customer_Type.hasMany(models.Demand_History, {
                foreignKey: "customer_typeId",
                targetKey: "id",
            });
        }
    }
    Customer_Type.init({
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
        modelName: "Customer_Type",
        tableName: 'customer_types',
    });
    return Customer_Type;
};