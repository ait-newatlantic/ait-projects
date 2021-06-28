"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Contact_Types",
      [
        {
          name: "QUA ĐIỆN THOẠI",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "QUA EMAIL, ZALO,..",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GẶP TRỰC TIẾP",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Contact_Types", null, {});
  },
};
