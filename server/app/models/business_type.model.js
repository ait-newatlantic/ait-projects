module.exports = (sequelize, Sequelize) => {
    const Business_Type = sequelize.define("business_types", {
        business_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        business_type_name: {
            type: Sequelize.STRING
        },
        business_type_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Business_Type;
};
