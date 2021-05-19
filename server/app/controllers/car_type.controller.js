const db = require("../models");
const CarType = db.car_type;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  CarType.findAll({
    where: {
      hide: {
        [Op.eq]: 0,
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving car_types.",
      });
      console.log(err);
    });
};
