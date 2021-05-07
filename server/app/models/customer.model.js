module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define("customers",
        {
            customer_name: {
                type: Sequelize.STRING
            },
            customer_number: {
                type: Sequelize.STRING
            },
            customer_address: {
                type: Sequelize.STRING
            },
            customer_manager: {
                type: Sequelize.STRING
            },
            customer_manager_number: {
                type: Sequelize.STRING
            },
            customer_manager_email: {
                type: Sequelize.STRING
            },
            customer_taxcode: {
                type: Sequelize.STRING
            },
            customer_hide: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0,
            }
        });
    return Customers;
};