module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define("customers",
        {
            employee: {
                type: Sequelize.STRING
            },
            customer: {
                type: Sequelize.STRING
            },
            customer_number: {
                type: Sequelize.STRING
            },
            customer_representative: {
                type: Sequelize.STRING
            },
            customer_representative_number: {
                type: Sequelize.STRING
            },
            customer_representative_email: {
                type: Sequelize.STRING
            },
            customer_area: {
                type: Sequelize.STRING
            },
            customer_taxcode: {
                type: Sequelize.STRING
            },
            customer_type: {
                type: Sequelize.STRING
            },
            customer_address: {
                type: Sequelize.STRING
            },
           
        });
    return Customers;
};  