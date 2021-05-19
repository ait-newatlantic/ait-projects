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
    targetKey: 'id',
});
db.branch.hasMany(db.user, {
    foreignKey: 'branchId',
    targetKey: 'id',
});


//customer
db.customer.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: 'id',
});
db.user.hasMany(db.customer, {
    foreignKey: "userId",
    targetKey: 'id',
});

db.customer.belongsTo(db.province, {
    foreignKey: "provinceId",
    targetKey: 'id',
});
db.province.hasMany(db.customer, {
    foreignKey: "provinceId",
    targetKey: 'id',
});

db.customer.belongsTo(db.business_type, {
    foreignKey: "business_typeId",
    targetKey: "id",
});
db.business_type.hasMany(db.customer, {
    foreignKey: "business_typeId",
    targetKey: "id",
});

//demand
db.demand.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
});
db.user.hasMany(db.demand, {
    foreignKey: "userId",
    targetKey: "id",
});

db.demand.belongsTo(db.customer, {
    foreignKey: "customerId",
    targetKey: "id",
});
db.customer.hasMany(db.demand, {
    foreignKey: "customerId",
    targetKey: "id",
});

db.demand.belongsTo(db.customer_type, {
    foreignKey: "customer_typeId",
    targetKey: "id",
});
db.customer_type.hasMany(db.demand, {
    foreignKey: "customer_typeId",
    targetKey: "id",
});

db.demand.belongsTo(db.car_model, {
    foreignKey: "car_modelId",
    targetKey: "id",
});
db.car_model.hasMany(db.demand, {
    foreignKey: "car_modelId",
    targetKey: "id",
});

db.demand.belongsTo(db.car_type, {
    foreignKey: "car_typeId",
    targetKey: "id",
});
db.car_type.hasMany(db.demand, {
    foreignKey: "car_typeId",
    targetKey: "id",
});

db.demand.belongsTo(db.color, {
    foreignKey: "colorId",
    targetKey: "id",
});
db.color.hasMany(db.demand, {
    foreignKey: "colorId",
    targetKey: "id",
});

db.demand.belongsTo(db.demand_status, {
    foreignKey: "demand_statusId",
    targetKey: "id",
});
db.demand_status.hasMany(db.demand, {
    foreignKey: "demand_statusId",
    targetKey: "id",
});

db.demand.belongsTo(db.contact_type, {
    foreignKey: "contact_typeId",
    targetKey: "id",
});
db.contact_type.hasMany(db.demand, {
    foreignKey: "contact_typeId",
    targetKey: "id",
});

//demand_history
db.demand_history.belongsTo(db.demand, {
    foreignKey: "demandId",
    targetKey: "id",
});
db.demand.hasMany(db.demand_history, {
    foreignKey: "demandId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
});
db.user.hasMany(db.demand_history, {
    foreignKey: "userId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.customer, {
    foreignKey: "customerId",
    targetKey: "id",
});
db.customer.hasMany(db.demand_history, {
    foreignKey: "customerId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.customer_type, {
    foreignKey: "customer_typeId",
    targetKey: "id",
});
db.customer_type.hasMany(db.demand_history, {
    foreignKey: "customer_typeId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.car_model, {
    foreignKey: "car_modelId",
    targetKey: "id",
});
db.car_model.hasMany(db.demand_history, {
    foreignKey: "car_modelId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.car_type, {
    foreignKey: "car_typeId",
    targetKey: "id",
});
db.car_type.hasMany(db.demand_history, {
    foreignKey: "car_typeId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.color, {
    foreignKey: "colorId",
    targetKey: "id",
});
db.color.hasMany(db.demand_history, {
    foreignKey: "colorId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.demand_status, {
    foreignKey: "demand_statusId",
    targetKey: "id",
});
db.demand_status.hasMany(db.demand_history, {
    foreignKey: "demand_statusId",
    targetKey: "id",
});

db.demand_history.belongsTo(db.contact_type, {
    foreignKey: "contact_typeId",
    targetKey: "id",
});
db.contact_type.hasMany(db.demand_history, {
    foreignKey: "contact_typeId",
    targetKey: "id",
});




db.ROLES = ["user", "admin", "moderator", "employee"];

module.exports = db;