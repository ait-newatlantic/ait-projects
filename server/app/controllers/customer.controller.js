const db = require("../models");
const Op = db.Sequelize.Op;
const Customer = db.customer;

exports.create = (req, res) => {
  if (
    !req.body.customer_name ||
    !req.body.customer_number ||
    !req.body.customer_address ||
    !req.body.provinceId ||
    !req.body.business_typeId ||
    !req.body.userId
  ) {
    res.status(400).send({
      message: {
        heading: "Oh snap! You got an error!",
        message:
          "Xin hãy điền đầy đủ thông tin: tên khách hàng, sđt, khu vực, loại khách hàng, mã số thuế khách hàng đối với doanh nghiệp!!!",
      },
    });
    return;
  }
  Customer.create({
    name: req.body.customer_name,
    number: req.body.customer_number,
    address: req.body.customer_address,
    customer_manager: req.body.customer_manager,
    customer_manager_number: req.body.customer_manager_number,
    customer_manager_email: req.body.customer_manager_email,
    customer_taxcode: req.body.customer_taxcode,
    provinceId: req.body.provinceId,
    userId: req.body.userId,
    business_typeId: req.body.business_typeId,
  })
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
          err.message || "Some error occurred while creating the Customer.",
      });
      console.log(err);
    });
};

exports.findAll = (req, res) => {
  const hide = req.query.hide;
  const order = req.query.order;
  Customer.findAll({
    order: [["id", order]],
    where: [
      {
        hide: {
          [Op.eq]: hide,
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
        model: db.province,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.business_type,
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
        message: "Error retrieving Customers",
      });
      console.log(err);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Customer.findByPk(id, {
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
        model: db.province,
        where: {
          hide: {
            [Op.eq]: 0,
          },
        },
      },
      {
        model: db.business_type,
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
        message: "Error retrieving Customer with id=" + id + err,
      });
    });
};

exports.findWithFilters = (req, res) => {
  const name = req.query.name;
  const number = req.query.number;
  const address = req.query.address;
  const manager = req.query.manager;
  const manager_number = req.query.manager_number;
  const manager_email = req.query.manager_email;
  const taxcode = req.query.taxcode;
  const hide = req.query.hide;
  const user_name = req.query.user_name;
  const username = req.query.username;
  const province = req.query.province;
  const business_type = req.query.business_type;
  const datetype = req.query.datetype;
  const from_date = req.query.from_date;
  const to_date = req.query.to_date;
  const branch_name = req.query.branch_name;
  const order = req.query.order;
  const limit = parseInt(req.query.limit) || null;
  Customer.findAll({
    order: [["id", order]],
    limit: limit,
    where: [
      {
        name: {
          [Op.like]: `%${name}%`,
        },
        number: {
          [Op.like]: `%${number}%`,
        },
        address: {
          [Op.like]: `%${address}%`,
        },
        manager: {
          [Op.or]: {
            [Op.like]: `%${manager}%`,
            [Op.eq]: null,
          },
        },
        manager_number: {
          [Op.or]: {
            [Op.like]: `%${manager_number}%`,
            [Op.eq]: null,
          },
        },
        manager_email: {
          [Op.or]: {
            [Op.like]: `%${manager_email}%`,
            [Op.eq]: null,
          },
        },
        taxcode: {
          [Op.or]: {
            [Op.like]: `%${taxcode}%`,
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
          hide: {
            [Op.eq]: 0,
          },
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
              hide: {
                [Op.eq]: 0,
              },
              name: {
                [Op.or]: {
                  [Op.like]: `%${branch_name}%`,
                  [Op.eq]: null,
                },
              },
            },
          },
        ],
      },
      {
        model: db.province,
        where: {
          hide: {
            [Op.eq]: 0,
          },
          name: {
            [Op.or]: {
              [Op.like]: `%${province}%`,
              [Op.eq]: null,
            },
          },
        },
      },
      {
        model: db.business_type,
        where: {
          hide: {
            [Op.eq]: 0,
          },
          name: {
            [Op.or]: {
              [Op.like]: `%${business_type}%`,
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

exports.update = (req, res) => {
  const id = req.params.id;
  Customer.update(
    {
      manager: req.body.manager,
      manager_number: req.body.manager_number,
      manager_email: req.body.manager_email,
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
            message: "Customer was updated successfully!",
          },
        });
      } else {
        res.status(400).send({
          message: {
            heading: "Oh snap! You got an error!",
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
      console.log(err);
    });
};

exports.hide = (req, res) => {
  const id = req.query.id;
  const hide = req.query.hide;
  Customer.update(
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
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
      console.log(err);
    });
};
