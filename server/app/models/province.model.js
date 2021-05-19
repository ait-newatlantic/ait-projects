module.exports = (sequelize, Sequelize) => {
    const Province = sequelize.define("provinces", {
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
    return Province;
};