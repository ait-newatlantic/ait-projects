const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
            Customer.belongsTo(models.Province, {
                foreignKey: "provinceId",
                targetKey: "id",
            });
            Customer.belongsTo(models.Business_Type, {
                foreignKey: "business_typeId",
                targetKey: "id",
            });
            Customer.hasMany(models.Demand, {
                foreignKey: "customerId",
                targetKey: "id",
            });
            Customer.hasMany(models.Demand_History, {
                foreignKey: "customerId",
                targetKey: "id",
            });
        }
    }
    Customer.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        number: DataTypes.STRING,
        address: DataTypes.STRING,
        manager: DataTypes.STRING,
        manager_number: DataTypes.STRING,
        manager_email: DataTypes.STRING,
        taxcode: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        provinceId: DataTypes.INTEGER,
        business_typeId: DataTypes.INTEGER,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Customer",
        tableName: 'customers',
    });
    return Customer;
};