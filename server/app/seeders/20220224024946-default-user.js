module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users", [
      {
        username: 'AIT.ADM.0001',
        name: "Trần Hoàng Nam",
        socialId: 123,
        phone: 012313123123,
        password: "$2a$08$TBUsDDzTO.T2JLmNoKcGreO9z9WNE3PtraqGy54ATm9yPEbv3U5Ri",
        hide: false,
        startDate: new Date(),
        endDate: new Date(),
        working: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'AIT.ADM.0002',
        name: "Nguyễn Bảo Thi",
        socialId: 123,
        phone: 012313123123,
        password: "$2a$08$TBUsDDzTO.T2JLmNoKcGreO9z9WNE3PtraqGy54ATm9yPEbv3U5Ri",
        hide: false,
        startDate: new Date(),
        endDate: new Date(),
        working: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'AIT.ADM.0003',
        name: "Trần Văn Trung",
        socialId: 123,
        phone: 012313123123,
        password: "$2a$08$TBUsDDzTO.T2JLmNoKcGreO9z9WNE3PtraqGy54ATm9yPEbv3U5Ri",
        hide: false,
        startDate: new Date(),
        endDate: new Date(),
        working: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};