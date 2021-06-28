"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Car_Models",
      [
        {
          name: "6460",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "6540",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "43253",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "43265",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "43266",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "53288",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "53229",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "65115",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "65116",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "65117",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cẩu 5-7 tấn",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Car_Models", null, {});
  },
};
