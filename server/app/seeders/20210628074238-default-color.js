"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Colors",
      [
        {
          name: "Chưa quyết định",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cam",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Trắng",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vàng",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xanh",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xanh quân đội",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Đỏ",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Colors", null, {});
  },
};
