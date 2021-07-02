require("dotenv/config");

module.exports = {
    development: {
        username: process.env.USER,
        password: process.env.PASS,
        database: process.env.DATABASE_DEV,
        host: process.env.HOST,
        dialect: "mysql",
    },
    test: {
        username: process.env.TEST_USER,
        password: process.env.TEST_PASS,
        database: process.env.DATABASE_TEST,
        host: process.env.HOST,
        dialect: "mysql",
    },
    production: {
        username: process.env.PROD_USER,
        password: process.env.PROD_PASS,
        database: process.env.PROD_DATABASE,
        host: process.env.PROD_HOST,
        dialect: "mysql",
    },
};