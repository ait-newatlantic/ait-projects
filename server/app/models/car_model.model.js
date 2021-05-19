module.exports = (sequelize, Sequelize) => {
  const Car_Model = sequelize.define("car_models", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    hide: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
  });
  return Car_Model;
};
