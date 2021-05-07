module.exports = (sequelize, Sequelize) => {
    const Car_Type = sequelize.define("car_types", {
        car_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        car_type_name: {
            type: Sequelize.STRING
        },
        car_type_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Car_Type;
};
