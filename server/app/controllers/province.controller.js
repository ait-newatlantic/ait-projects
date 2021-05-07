const db = require("../models");
const Province = db.province;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  var condition = { province_hide: { [Op.eq]: 0 } };

  Province.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provinces."
      });
      console.log(err)
    });
};

exports.findOneProvince = (req, res) => {
  const province_name = req.query.province_name;
  return db.sequelize.query(` SELECT * FROM provinces WHERE province_name="${province_name}" `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};
