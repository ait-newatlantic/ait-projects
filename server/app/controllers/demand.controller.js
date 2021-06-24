const db = require("../models");
const Demand = db.demand;
const Op = db.Sequelize.Op;

//ADMIN
exports.create = (req, res) => {
  // Validate request check if any thing missing!!!
  if (req.body.arr && !req.body.arr.length) {
    res.status(400).send({
      message: {
        heading: "Oh snap! You got an error!",
        message:
          " Xin vui lòng nhập thông tin khách hàng và thông tin xe đầy đủ!",
      },
    });
    return;
  }

  const initial = {
    arr: req.body.arr,
  };

  // Save Demand in the database
  const requestArr = initial.arr.map((item) => {
    return Demand.create({
      date: item.date,
      userId: item.userId,
      employee: item.demand_employee,
      car_modelId: item.car_modelId,
      car_typeId: item.car_typeId,
      quantity: parseInt(item.demand_quantity),
      colorId: item.colorId,
      demand_statusId: item.demand_statusId,
      customerId: item.customerId,
      customer_typeId: item.customer_typeId,
      opinion: item.demand_opinion,
      meeting: item.demand_meeting,
      contact_typeId: item.contact_typeId,
      note: item.demand_note,
    });
  });
  return Promise.all(requestArr)
    .then((data) => {
      res.send({
        message: {
          heading: "Success !!!",
          message: "Form đã được gửi thành công",
        },
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Demand.",
      });
      console.log(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const date = req.body.date;
  const demand_statusId = req.body.demand_status;
  const colorId = req.body.color;
  const note = req.body.note;
  Demand.update(
    {
      date: date,
      demand_statusId: demand_statusId,
      colorId: colorId,
      note: note,
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: {
            heading: "Success !!!",
            message: "Form đã được cập nhật thành công",
          },
        });
      } else {
        res.status(400).send({
          message: {
            heading: "Oh snap! You got an error!",
            message: `Cannot update Demand with id=${id}. Maybe Demand was not found or req.body is empty!`,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Demand with id=" + id + err,
      });
      console.log(err);
    });
};

exports.findAll = (req, res) => {
  Demand.findAll({
    where: [
      {
        hide: {
          [Op.eq]: 0,
        },
      },
    ],
    include: [
      {
        model: db.user,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
        include: [
          {
            model: db.branch,
            where: {
              hide: {
                [Op.eq]: 0,
              },
            },
          },
        ],
      },
      {
        model: db.customer,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
        include: [
          {
            model: db.province,
            where: {
              hide: {
                [Op.eq]: 0,
              },
            },
          },
        ],
      },
      {
        model: db.customer_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.car_model,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.car_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.color,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.demand_status,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.contact_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Demands",
      });
      console.log(err);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Demand.findByPk(id, {
    include: [
      {
        model: db.user,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
        include: [
          {
            model: db.branch,
            where: {
              hide: {
                [Op.eq]: 0,
              },
            },
          },
        ],
      },
      {
        model: db.customer,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
        include: [
          {
            model: db.province,
            where: {
              hide: {
                [Op.eq]: 0,
              },
            },
          },
        ],
      },
      {
        model: db.customer_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.car_model,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.car_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.color,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.demand_status,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.contact_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Demand with id=" + id + err,
      });
    });
};

exports.findWithFilters = (req, res) => {
  const branch = req.query.branch_name;
  const user_name = req.query.user_name;
  const employee = req.query.employee;
  const username = req.query.username;
  const province = req.query.province;
  const customer = req.query.customer;
  const customer_number = req.query.customer_number;
  const customer_type = req.query.customer_type;
  const color = req.query.color;
  const opinion = req.query.opinion;
  const quantity = req.query.quantity;
  const contact_type = req.query.contact_type;
  const demand_status = req.query.demand_status;
  const car_model = req.query.car_model;
  const car_type = req.query.car_type;
  const datetype = req.query.datetype;
  const from_date = req.query.from_date;
  const to_date = req.query.to_date;
  const hide = req.query.hide;
  const order = req.query.order;
  const limit = parseInt(req.query.limit) || null;
  Demand.findAll({
    order: [["id", order]],
    limit: limit,
    where: [
      {
        employee: {
          [Op.or]: {
            [Op.like]: `%${employee}%`,
            [Op.eq]: null,
          },
        },
        opinion: {
          [Op.or]: {
            [Op.like]: `%${opinion}%`,
            [Op.eq]: null,
          },
        },
        quantity: {
          [Op.or]: {
            [Op.like]: `%${quantity}%`,
            [Op.eq]: null,
          },
        },
        hide: {
          [Op.eq]: hide,
        },
        [datetype]: {
          [Op.between]: [from_date, to_date],
        },
      },
    ],
    include: [
      {
        model: db.user,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${user_name}%`,
              [Op.eq]: null,
            },
          },
          username: {
            [Op.or]: {
              [Op.like]: `%${username}%`,
              [Op.eq]: null,
            },
          },
        },
        include: [
          {
            model: db.branch,
            where: {
              name: {
                [Op.or]: {
                  [Op.like]: `%${branch}%`,
                  [Op.eq]: null,
                },
              },
            },
          },
        ],
      },
      {
        model: db.customer,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${customer}%`,
              [Op.eq]: null,
            },
          },
          number: {
            [Op.or]: {
              [Op.like]: `%${customer_number}%`,
              [Op.eq]: null,
            },
          },
        },
        include: [
          {
            model: db.province,
            where: {
              name: {
                [Op.or]: {
                  [Op.like]: `%${province}%`,
                  [Op.eq]: null,
                },
              },
            },
          },
        ],
      },
      {
        model: db.customer_type,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${customer_type}%`,
              [Op.eq]: null,
            },
          },
        },
      },
      {
        model: db.car_model,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${car_model}%`,
              [Op.eq]: null,
            },
          },
        },
      },
      {
        model: db.car_type,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${car_type}%`,
              [Op.eq]: null,
            },
          },
        },
      },
      {
        model: db.color,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${color}%`,
              [Op.eq]: null,
            },
          },
        },
      },
      {
        model: db.demand_status,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${demand_status}%`,
              [Op.eq]: null,
            },
          },
        },
      },
      {
        model: db.contact_type,
        where: {
          name: {
            [Op.or]: {
              [Op.like]: `%${contact_type}%`,
              [Op.eq]: null,
            },
          },
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Customers" + err,
      });
    });
};

exports.hide = (req, res) => {
  const id = req.query.id;
  const hide = req.query.hide;

  Demand.update(
    {
      hide: hide,
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: {
            heading: "Success !!!",
            message: "Form đã được cập nhật thành công",
          },
        });
      } else {
        res.status(400).send({
          message: {
            heading: "Oh snap! You got an error!",
            message: `Cannot update Demand with id=${id}. Maybe Demand was not found or req.body is empty!`,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Demand with id=" + id + err,
      });
      console.log(err);
    });
};

exports.findDemandStatusReport = (req, res) => {
  const branch_name = req.query.branch_name;
  const username = req.query.username;
  const from_date = req.query.from_date;
  const to_date = req.query.to_date;
  const to_date_month = to_date.slice(5, 7);
  console.log(to_date_month);
  return db.sequelize
    .query(
      `  SELECT  
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 1 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong1,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 1 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai1,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 1 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich1,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 2 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong2,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 2 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai2,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 2 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich2,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 3 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong3,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 3 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai3,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 3 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich3,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 4 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong4,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 4 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai4,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 4 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich4,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 5 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong5,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 5 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai5,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 5 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich5,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 6 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong6,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 6 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai6,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 6 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich6,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 7 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong7,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 7 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai7,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 7 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich7,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 8 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong8,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 8 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai8,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 8 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich8,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 9 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong9,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 9 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai9,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 9 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich9,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 10 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong10,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 10 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai10,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 10 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich10,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 11 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong11,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 11 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai11,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 11 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich11,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 12 AND demands.demand_statusId = 9 AND demands.hide = 0 THEN demands.quantity END) AS thanhcong12,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 12 AND demands.demand_statusId = 10 AND demands.hide = 0 THEN demands.quantity END) AS thatbai12,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.date) = 12 AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS danggiaodich12,
        SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demands.demand_statusId < 9 AND demands.hide = 0 THEN demands.quantity END) AS tongcongdanggiaodich${to_date_month}
        FROM demands
        LEFT JOIN users ON demands.userId = users.id
        LEFT JOIN branches ON users.branchId = branches.id
        WHERE UNIX_TIMESTAMP(demands.date) BETWEEN UNIX_TIMESTAMP('${from_date}') AND UNIX_TIMESTAMP('${to_date}')`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then((queues) => res.json(queues))
    .catch((err) => res.status(400).json(err));
};

exports.findAllTotal = (req, res) => {
  const fromdate = req.query.from_date;
  const todate = req.query.to_date;
  const branch_name = req.query.branch_name;
  const username = req.query.username;
  return db.sequelize
    .query(
      `SELECT 
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" THEN quantity END) as tongcong,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="1" THEN quantity END) as tiepcanchaohang,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="2" THEN quantity END) as chaythu,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="3" THEN quantity END) as damphan,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="4" THEN quantity END) as chotdonhang,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="5" THEN quantity END) as dacoc,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="7" THEN quantity END) as dathanhtoantamung,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" THEN quantity END) as hoantatgiaodich,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="6" THEN quantity END) as lenhopdong,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="8" THEN quantity END) as bangiaochuathanhtoan,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="10" THEN quantity END) as giaodichthatbai
    FROM demands
    LEFT JOIN users ON demands.userId = users.id
    LEFT JOIN branches ON users.branchId = branches.id
    WHERE UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then((queues) => res.json(queues))
    .catch((err) => res.status(400).json(err));
};

exports.findAllQuantity = (req, res) => {
  const fromdate = req.query.from_date;
  const todate = req.query.to_date;
  const branch_name = req.query.branch_name;
  const username = req.query.username;

  return db.sequelize
    .query(
      `SELECT 
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id ="1" THEN quantity END) as c6540,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="2" THEN quantity END) as c6460,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="3" THEN quantity END) as c43253,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="4" THEN quantity END) as c43265,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="5" THEN quantity END) as c43266,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="6" THEN quantity END) as c53228,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="7" THEN quantity END) as c53229,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="8" THEN quantity END) as c65115,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="9" THEN quantity END) as c65116,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="10" THEN quantity END) as c65117,
    SUM(CASE WHEN branches.name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demand_statusId="9" AND car_models.id="11" THEN quantity END) as c57
    FROM demands
    LEFT JOIN users ON demands.userId = users.id
    LEFT JOIN branches ON users.branchId = branches.id
    LEFT JOIN car_models ON demands.car_modelId = car_models.id
    WHERE UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then((queues) => res.json(queues))
    .catch((err) => res.status(400).json(err));
};
