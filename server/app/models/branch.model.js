module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define("branches", {
        branch_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        branch_name: {
            type: Sequelize.STRING
        },
        branch_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });

    return Branch;
};