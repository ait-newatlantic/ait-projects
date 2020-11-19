module.exports = {
  HOST: "localhost",
  USER: "namtran",
  PASSWORD: "123456",
  DB: "ait",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
