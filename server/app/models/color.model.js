module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define("colors", {
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
    return Color;
};
