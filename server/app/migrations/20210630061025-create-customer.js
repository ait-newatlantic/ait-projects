module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Customers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            number: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            manager: {
                type: Sequelize.STRING,
            },
            manager_number: {
                type: Sequelize.STRING,
            },
            manager_email: {
                type: Sequelize.STRING,
            },
            taxcode: {
                type: Sequelize.STRING,
            },
            hide: {
                type: Sequelize.BOOLEAN,
            },
            business_typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'business_types',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            proviceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'provinces',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Customers");
    },
};