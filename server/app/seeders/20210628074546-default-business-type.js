module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "business_types", [{
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
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("business_types", null, {});
    },
};