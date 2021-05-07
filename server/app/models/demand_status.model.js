module.exports = (sequelize, Sequelize) => {
    const Demand_status = sequelize.define("demand_statuses", {
        demand_status_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        demand_status_name: {
            type: Sequelize.STRING
        },
        demand_status_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Demand_status;
};
