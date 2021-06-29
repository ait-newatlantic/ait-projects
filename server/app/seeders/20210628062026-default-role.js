module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Roles", [{
                    name: "user",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "moderator",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "admin",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "employee",
                    hide: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Roles", null, {});
    },
};