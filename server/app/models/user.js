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
            User.belongsToMany(models.Vehicle, {
                through: "user_vehicles",
                foreignKey: "userId",
                otherKey: "vehicleId",
            });
            User.belongsToMany(models.Project, {
                through: "user_projects",
                foreignKey: "userId",
                otherKey: "projectId",
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
        phone: DataTypes.INTEGER,
        socialId: DataTypes.INTEGER,
        working: DataTypes.BOOLEAN,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        password: DataTypes.STRING,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "User",
        tableName: 'users',
    });
    return User;
};