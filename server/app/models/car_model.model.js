module.exports = (sequelize, Sequelize) => {
    const Car_Model = sequelize.define("car_models", {
        model_name: {
            type: Sequelize.STRING
        },
    });
    return Car_Model;
};
