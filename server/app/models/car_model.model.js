module.exports = (sequelize, Sequelize) => {
    const Car_Model = sequelize.define("car_models", {
        car_model_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        car_model_name: {
            type: Sequelize.STRING
        },
        car_model_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Car_Model;
};
