module.exports = (sequelize, Sequelize) => {
    const Demands = sequelize.define("demands",
        {
            employee: {
                type: Sequelize.STRING
            },
            employee_field: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATEONLY    
            },
            model: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            customer: {
                type: Sequelize.STRING
            },
            customer_number: {
                type: Sequelize.STRING
            },
            customer_type: {
                type: Sequelize.STRING
            },
            customer_area: {
                type: Sequelize.STRING
            },
            customer_opinion: {
                type: Sequelize.STRING
            },
            customer_meeting: {
                type: Sequelize.STRING
            },
            customer_communication: {
                type: Sequelize.STRING
            },
            color: {
                type: Sequelize.STRING
            },
            ait: {
                type: Sequelize.INTEGER
            },
            kmt: {
                type: Sequelize.INTEGER
            },
            note: {
                type: Sequelize.STRING
            },
        });

    return Demands;
};  