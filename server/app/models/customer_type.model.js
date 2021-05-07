module.exports = (sequelize, Sequelize) => {
    const Customer_Type = sequelize.define("customer_types", {
        customer_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        customer_type_name: {
            type: Sequelize.STRING
        },
        customer_type_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Customer_Type;
};
