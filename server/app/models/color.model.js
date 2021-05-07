module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define("colors", {
        color_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        color_name: {
            type: Sequelize.STRING
        },
        color_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Color;
};
