module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Branches", [{
                    name: "AIT",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Đăk Lăk",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Phòng dự án",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Đồng Nai",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Quảng Trị",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Đà Nẵng",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Vũng Tàu",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Gia Lai",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Tây Ninh",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Lâm Đồng",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Cần Thơ",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Bình Phước",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Hưng Yên",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Bình Định",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Nguyễn Văn Linh",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Bình Dương",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Branches", null, {});
    },
};