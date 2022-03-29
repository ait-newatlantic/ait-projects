module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_roles", [
      {
        roleId: 6,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};