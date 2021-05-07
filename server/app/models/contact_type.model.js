module.exports = (sequelize, Sequelize) => {
    const Contact_Type = sequelize.define("contact_types", {
        contact_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        contact_type_name: {
            type: Sequelize.STRING
        },
        contact_type_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Contact_Type;
};
