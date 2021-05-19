module.exports = (sequelize, Sequelize) => {
    const Contact_Type = sequelize.define("contact_types", {
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
    return Contact_Type;
};
