module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "roles", [
            {
                name: "user",
                hide: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "accountant",
                hide: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "manager",
                hide: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "driver",
                hide: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "techinician",
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
        ], {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("roles", null, {});
    },
};