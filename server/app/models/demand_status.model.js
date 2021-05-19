module.exports = (sequelize, Sequelize) => {
  const Demand_status = sequelize.define("demand_statuses", {
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
  return Demand_status;
};
