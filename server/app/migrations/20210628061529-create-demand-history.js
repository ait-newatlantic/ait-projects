module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Demand_Histories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            note: {
                type: Sequelize.STRING,
            },
            employee: {
                type: Sequelize.STRING,
            },
            opinion: {
                type: Sequelize.STRING,
            },
            meeting: {
                type: Sequelize.STRING,
            },
            hide: {
                type: Sequelize.BOOLEAN,
            },
            car_modelId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'car_models',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            car_typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'car_types',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            colorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'colors',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            contact_typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'contact_types',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            customerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'customers',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            customer_typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'customer_types',
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
            demand_statusId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'demand_statuses',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
            demandId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'demands',
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
        await queryInterface.dropTable("Demand_Histories");
    },
};