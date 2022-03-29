module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "projects", [
      {
        name: "Sân bay Long Thành",
        hide: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thuỷ điện IALY",
        hide: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("projects", null, {});
  },
};