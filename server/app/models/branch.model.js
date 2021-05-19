module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define("branches", {
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

    return Branch;
};