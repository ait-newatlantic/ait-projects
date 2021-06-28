"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Business_Types",
      [
        {
          name: "TƯ NHÂN",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DOANH NGHIỆP",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Business_Types", null, {});
  },
};
