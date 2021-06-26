module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
    name: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    manager: {
      type: Sequelize.STRING,
    },
    manager_number: {
      type: Sequelize.STRING,
    },
    manager_email: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    taxcode: {
      type: Sequelize.STRING,
    },
    hide: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
  });
  return Customers;
};
