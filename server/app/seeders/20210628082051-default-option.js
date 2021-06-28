"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Options",
      [
        {
          name: "Sidebar",
          content: "#05386b",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Subheader",
          content: "#074c90",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Options", null, {});
  },
};
