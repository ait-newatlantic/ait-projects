module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "vehicles", [
      {
        name: "Máy đào PC450-10 Komatsu",
        code: 'K01',
        registryDate: '2022-02-26 00:53:47',
        plateNumber: '1234',
        createdYear: 2013,
        isWorking: true,
        description: 'ABC',
        hide: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Máy ủi D85",
        code: 'K02',
        registryDate: '2022-02-26 00:53:47',
        plateNumber: '1234',
        createdYear: 2017,
        isWorking: false,
        description: 'ABCD',
        hide: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("vehicles", null, {});
  },
};