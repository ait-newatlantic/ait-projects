"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Car_Types",
      [
        {
          name: "Xe Ben - OVAL",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe Ben - VÁT",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe tải thùng VN",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe tải thùng nhập",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe ben thùng Việt Nam",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe tải gắn cẩu 5 tấn",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe tải gắn cẩu 7 tấn",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe tải gắn cẩu 8 tấn",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe tải gắn cẩu 10 tấn",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe cứu hỏa",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe bồn chở xăng dầu",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe bồn nước",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe bồn nhựa đường",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xe đầu kéo",
          hide: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Car_Types", null, {});
  },
};
