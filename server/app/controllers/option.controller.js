const db = require("../models");
const Option = db.option;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Option.findAll({
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
        message: err.message || "Some error occurred while retrieving options.",
      });
      console.log(err);
    });
};
