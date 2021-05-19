module.exports = (sequelize, Sequelize) => {
    const Business_Type = sequelize.define("business_types", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Business_Type;
};
