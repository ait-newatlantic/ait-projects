module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Customer_Types", [{
                    name: "DỰ KIẾN",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "TIỀM NĂNG",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "ĐÃ SỬ DỤNG KAMAZ",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Customer_Types", null, {});
    },
};