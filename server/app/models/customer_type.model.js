module.exports = (sequelize, Sequelize) => {
  const Customer_Type = sequelize.define("customer_types", {
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
  return Customer_Type;
};
