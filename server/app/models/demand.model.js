module.exports = (sequelize, Sequelize) => {
  const Demand = sequelize.define("demands", {
    quantity: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    note: {
      type: Sequelize.STRING,
    },
    employee: {
      type: Sequelize.STRING,
    },
    opinion: {
      type: Sequelize.STRING,
    },
    meeting: {
      type: Sequelize.STRING,
    },
    hide: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
  });
  return Demand;
};
