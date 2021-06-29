const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Contact_Type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Contact_Type.hasMany(models.Demand, {
                foreignKey: "contact_typeId",
                targetKey: "id",
            });
            Contact_Type.hasMany(models.Demand_History, {
                foreignKey: "contact_typeId",
                targetKey: "id",
            });
        }
    }
    Contact_Type.init({
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
        modelName: "Contact_Type",
        tableName: 'contact_types',
    });
    return Contact_Type;
};