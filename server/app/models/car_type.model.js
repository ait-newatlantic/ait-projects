module.exports = (sequelize, Sequelize) => {
    const Car_Type = sequelize.define("car_types", {
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
    return Car_Type;
};
