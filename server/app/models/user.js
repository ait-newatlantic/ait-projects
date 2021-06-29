const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsToMany(models.Role, {
                through: "user_roles",
                foreignKey: "userId",
                otherKey: "roleId",
            });
            User.belongsTo(models.Branch, {
                foreignKey: "branchId",
                targetKey: "id",
            });
            User.hasMany(models.Customer, {
                foreignKey: "userId",
                targetKey: "id",
            });
            User.hasMany(models.Demand, {
                foreignKey: "userId",
                targetKey: "id",
            });
            User.hasMany(models.Demand_History, {
                foreignKey: "userId",
                targetKey: "id",
            });

        }
    }
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        branchId: DataTypes.INTEGER,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "User",
        tableName: 'users',
    });
    return User;
};