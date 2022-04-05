module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert(
        "units", [
        {
          name: 'chiếc',
          hide: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "cái",
          hide: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {}
      );
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("units", null, {});
    },
  };