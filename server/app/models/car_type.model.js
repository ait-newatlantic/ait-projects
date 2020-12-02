module.exports = (sequelize, Sequelize) => {
    const Car_Type = sequelize.define("car_types", {
        type_name: {
            type: Sequelize.STRING
        },
    });
    return Car_Type;
};
