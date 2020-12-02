module.exports = (sequelize, Sequelize) => {
    const Province = sequelize.define("provinces", {
        province_name: {
            type: Sequelize.STRING
        },
    });
    return Province;
};
