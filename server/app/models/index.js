const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.branch = require("../models/branch.model.js")(sequelize, Sequelize);
db.province = require("../models/province.model.js")(sequelize, Sequelize);
db.car_model = require("../models/car_model.model.js")(sequelize, Sequelize);
db.car_type = require("../models/car_type.model.js")(sequelize, Sequelize);
db.demand = require("../models/demand.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
db.color = require("../models/color.model.js")(sequelize, Sequelize);
db.business_type = require("../models/business_type.model.js")(sequelize, Sequelize);
db.demand_history = require("../models/demand_history.model.js")(sequelize, Sequelize);
db.contact_type = require("../models/contact_type.model.js")(sequelize, Sequelize);
db.customer_type = require("../models/customer_type.model.js")(sequelize, Sequelize);
db.demand_status = require("../models/demand_status.model.js")(sequelize, Sequelize);

//user_roles
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

//user
db.user.belongsTo(db.branch, {
    foreignKey: "branchId",
    as: "branches",
});

//customer
db.customer.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users",
});

db.customer.belongsTo(db.province, {
    foreignKey: "provinceId",
    as: "provinces",
});

db.customer.belongsTo(db.business_type, {
    foreignKey: "business_typeId",
    as: "business_types",
});

//demand
db.demand.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users",
});
db.demand.belongsTo(db.customer, {
    foreignKey: "customerId",
    as: "customers",
});
db.demand.belongsTo(db.customer_type, {
    foreignKey: "customer_typeId",
    as: "customer_types",
});
db.demand.belongsTo(db.car_model, {
    foreignKey: "car_modelId",
    as: "car_models",
});
db.demand.belongsTo(db.car_type, {
    foreignKey: "car_typeId",
    as: "car_types",
});
db.demand.belongsTo(db.color, {
    foreignKey: "colorId",
    as: "colors",
});
db.demand.belongsTo(db.demand_status, {
    foreignKey: "demand_statusId",
    as: "demand_statuses",
});
db.demand.belongsTo(db.contact_type, {
    foreignKey: "contact_typeId",
    as: "contact_types",
});


//demand_history
db.demand_history.belongsTo(db.demand, {
    foreignKey: "demandId",
    as: "demands",
});
db.demand_history.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users",
});
db.demand_history.belongsTo(db.customer, {
    foreignKey: "customerId",
    as: "customers",
});
db.demand_history.belongsTo(db.customer_type, {
    foreignKey: "customer_typeId",
    as: "customer_types",
});
db.demand_history.belongsTo(db.car_model, {
    foreignKey: "car_modelId",
    as: "car_models",
});
db.demand_history.belongsTo(db.car_type, {
    foreignKey: "car_typeId",
    as: "car_types",
});
db.demand_history.belongsTo(db.color, {
    foreignKey: "colorId",
    as: "colors",
});
db.demand_history.belongsTo(db.demand_status, {
    foreignKey: "demand_statusId",
    as: "demand_statuses",
});
db.demand_history.belongsTo(db.contact_type, {
    foreignKey: "contact_typeId",
    as: "contact_types",
});

db.ROLES = ["user", "admin", "moderator", "employee"];

module.exports = db;