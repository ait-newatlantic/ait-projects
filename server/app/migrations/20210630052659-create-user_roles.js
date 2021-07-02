module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('user_roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
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
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'roles',
                        schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull: false
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_roles');
    }
}