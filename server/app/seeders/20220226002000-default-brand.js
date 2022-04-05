module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert(
        "brands", [
        {
          name: 'Kamaz',
          hide: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Komatsu",
          hide: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {}
      );
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("brands", null, {});
    },
  };