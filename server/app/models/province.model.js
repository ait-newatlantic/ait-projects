module.exports = (sequelize, Sequelize) => {
    const Province = sequelize.define("provinces", {
        province_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        province_name: {
            type: Sequelize.STRING
        },
        province_hide: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    });
    return Province;
};