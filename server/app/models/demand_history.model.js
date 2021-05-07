module.exports = (sequelize, Sequelize) => {
    const DemandHistory = sequelize.define("demand_histories", {
        demand_quantity: {
            type: Sequelize.INTEGER
        },
        demand_date: {
            type: Sequelize.DATEONLY
        },
        demand_note: {
            type: Sequelize.STRING
        },
        demand_employee: {
            type: Sequelize.STRING
        },
        demand_opinion: {
            type: Sequelize.STRING
        },
        demand_meeting: {
            type: Sequelize.STRING
        },
        demand_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        },
    });
    return DemandHistory;
};
