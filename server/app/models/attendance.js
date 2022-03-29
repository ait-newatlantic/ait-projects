const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Attendance.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
            Attendance.belongsTo(models.Project, {
                foreignKey: "projectId",
                targetKey: "id",
            });
        }
    }
    Attendance.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        available: DataTypes.BOOLEAN,
        hide: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Attendance",
        tableName: 'attendances',
    });
    return Attendance;
};