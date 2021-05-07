const db = require("../models");
const Demand = db.demand;
const Op = db.Sequelize.Op;

//ADMIN
exports.create = (req, res) => {
    // Validate request check if any thing missing!!!
    if (req.body.arr && !req.body.arr.length) {
        res.status(400).send({
            message: { heading: "Oh snap! You got an error!", message: " Xin vui lòng nhập thông tin khách hàng và thông tin xe đầy đủ!" }
        });
        return;
    }

    const initial = {
        arr: req.body.arr,
    }

    // Save Demand in the database
    const requestArr = initial.arr.map(item => {
        return Demand.create({
            demand_date: item.demand_date,
            userId: item.userId,
            demand_employee: item.demand_employee,
            car_modelId: item.car_modelId,
            car_typeId: item.car_typeId,
            demand_quantity: parseInt(item.demand_quantity),
            colorId: item.colorId,
            demand_statusId: item.demand_statusId,
            customerId: item.customerId,
            customer_typeId: item.customer_typeId,
            demand_opinion: item.demand_opinion,
            demand_meeting: item.demand_meeting,
            contact_typeId: item.contact_typeId,
            demand_note: item.demand_note,
        })
    })
    return Promise.all(requestArr)
        .then(data => {
            res.send({ message: { heading: "Success !!!", message: "Form đã được gửi thành công" }, data: data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Demand."
            });
            console.log(err)
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const demand = {
        demand_date: req.body.demand_date,
        demand_statusId: req.body.demand_status_id,
        colorId: req.body.color_id,
        demand_note: req.body.demand_note,
    };

    Demand.update(demand, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: { heading: "Success !!!", message: "Form đã được cập nhật thành công" }
                });
            } else {
                res.status(400).send({
                    message: { heading: "Oh snap! You got an error!", message: `Cannot update Demand with id=${id}. Maybe Demand was not found or req.body is empty!` }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Demand with id=" + id + err
            });
            console.log(err)
        });
};

exports.findAll = (req, res) => {
    return db.sequelize.query(
        ` SELECT demands.id, demands.demand_quantity, demands.demand_date, demands.demand_note, demands.demand_employee, demands.demand_opinion, 
        demands.demand_meeting, demands.createdAt, demands.updatedAt, users.name, customers.customer_name, customers.customer_number,
        customer_types.customer_type_name, provinces.province_name, branches.branch_name, demand_statuses.demand_status_name,
        car_models.car_model_name, car_types.car_type_name, colors.color_name, contact_types.contact_type_name 
      FROM demands 
      LEFT JOIN users
      ON demands.userId = users.id
      LEFT JOIN customers
      ON demands.customerId = customers.id
      LEFT JOIN car_models
      ON demands.car_modelId = car_models.car_model_id
      LEFT JOIN car_types
      ON demands.car_typeId = car_types.car_type_id
      LEFT JOIN colors
      ON demands.colorId = colors.color_id
      LEFT JOIN demand_statuses
      ON demands.demand_statusId = demand_statuses.demand_status_id
      LEFT JOIN contact_types
      ON demands.contact_typeId = contact_types.contact_type_id
      LEFT JOIN customer_types
      ON demands.customer_typeId = customer_types.customer_type_id
      LEFT JOIN branches
      ON users.branchId = branches.branch_id
      LEFT JOIN provinces
      ON customers.provinceId = provinces.province_id
      WHERE demands.demand_hide = 0
      ORDER BY demands.id DESC`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findOne = (req, res) => {
    const id = req.query.id;
    return db.sequelize.query(
        `SELECT demands.id, demands.demand_quantity, demands.demand_date, demands.demand_note, demands.demand_employee, demands.demand_opinion, 
        demands.demand_meeting, demands.createdAt, demands.updatedAt, users.name, users.username, users.id AS user_id ,  customers.customer_name, customers.customer_number, customers.id AS customer_id,
        customer_types.customer_type_name, customer_types.customer_type_id, provinces.province_name, branches.branch_name, demand_statuses.demand_status_name, demand_statuses.demand_status_id,
        car_models.car_model_name, car_models.car_model_id, 
        car_types.car_type_name, car_types.car_type_id,
        colors.color_name, colors.color_id, 
        contact_types.contact_type_name , contact_types.contact_type_id
      FROM demands 
      LEFT JOIN users
      ON demands.userId = users.id
      LEFT JOIN customers
      ON demands.customerId = customers.id
      LEFT JOIN car_models
      ON demands.car_modelId = car_models.car_model_id
      LEFT JOIN car_types
      ON demands.car_typeId = car_types.car_type_id
      LEFT JOIN colors
      ON demands.colorId = colors.color_id
      LEFT JOIN demand_statuses
      ON demands.demand_statusId = demand_statuses.demand_status_id
      LEFT JOIN contact_types
      ON demands.contact_typeId = contact_types.contact_type_id
      LEFT JOIN customer_types
      ON demands.customer_typeId = customer_types.customer_type_id
      LEFT JOIN branches
      ON users.branchId = branches.branch_id
      LEFT JOIN provinces
      ON customers.provinceId = provinces.province_id
        WHERE demands.id = "${id}"`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findDemandWithConditions = (req, res) => {
    const branch_name = req.query.branch_name;
    const demand_employee_name = req.query.demand_employee_name;
    const province_name = req.query.province_name;
    const customer_type_name = req.query.customer_type_name;
    const contact_type_name = req.query.contact_type_name;
    const demand_status_name = req.query.demand_status_name;
    const car_model_name = req.query.car_model_name;
    const car_type_name = req.query.car_type_name;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    const username = req.query.username;
    return db.sequelize.query(
        ` SELECT demands.id, demands.demand_quantity, demands.demand_date, demands.demand_note, 
        demands.demand_employee, demands.demand_opinion, demands.demand_hide,
        demands.demand_meeting, demands.createdAt, demands.updatedAt, 
        users.name, 
        users.username,
        customers.customer_name, customers.customer_number,
        customer_types.customer_type_name, provinces.province_name, branches.branch_name, demand_statuses.demand_status_name,
        car_models.car_model_name, car_types.car_type_name, colors.color_name, contact_types.contact_type_name   
        FROM demands 
    LEFT JOIN users
    ON demands.userId = users.id
    LEFT JOIN customers
    ON demands.customerId = customers.id
    LEFT JOIN car_models
    ON demands.car_modelId = car_models.car_model_id
    LEFT JOIN car_types
    ON demands.car_typeId = car_types.car_type_id
    LEFT JOIN colors
    ON demands.colorId = colors.color_id
    LEFT JOIN demand_statuses
    ON demands.demand_statusId = demand_statuses.demand_status_id
    LEFT JOIN contact_types
    ON demands.contact_typeId = contact_types.contact_type_id
    LEFT JOIN customer_types
    ON demands.customer_typeId = customer_types.customer_type_id
    LEFT JOIN branches
    ON users.branchId = branches.branch_id
    LEFT JOIN provinces
    ON customers.provinceId = provinces.province_id
    WHERE branches.branch_name LIKE "%${branch_name}%"
    AND users.name LIKE "%${demand_employee_name}%"
    AND provinces.province_name LIKE "%${province_name}%"
    AND customer_types.customer_type_name LIKE "%${customer_type_name}%"
    AND contact_types.contact_type_name LIKE "%${contact_type_name}%"
    AND demand_statuses.demand_status_name LIKE "%${demand_status_name}%"
    AND car_models.car_model_name LIKE "%${car_model_name}%"
    AND car_types.car_type_name LIKE "%${car_type_name}%"
    AND users.username LIKE "%${username}%"
    AND UNIX_TIMESTAMP(demands.demand_date) BETWEEN UNIX_TIMESTAMP('${from_date}') AND UNIX_TIMESTAMP('${to_date}')
    AND demands.demand_hide = 0
      ORDER BY demands.id DESC`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findDemandWithConditionsHide = (req, res) => {
    const branch_name = req.query.branch_name;
    const demand_employee_name = req.query.demand_employee_name;
    const province_name = req.query.province_name;
    const customer_type_name = req.query.customer_type_name;
    const contact_type_name = req.query.contact_type_name;
    const demand_status_name = req.query.demand_status_name;
    const car_model_name = req.query.car_model_name;
    const car_type_name = req.query.car_type_name;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    const username = req.query.username;
    return db.sequelize.query(
        ` SELECT demands.id, demands.demand_quantity, demands.demand_date, demands.demand_note, 
        demands.demand_employee, demands.demand_opinion, demands.demand_hide,
        demands.demand_meeting, demands.createdAt, demands.updatedAt, 
        users.name,
        users.username,  
        customers.customer_name, customers.customer_number,
        customer_types.customer_type_name, provinces.province_name, branches.branch_name, demand_statuses.demand_status_name,
        car_models.car_model_name, car_types.car_type_name, colors.color_name, contact_types.contact_type_name  
        FROM demands 
    LEFT JOIN users
    ON demands.userId = users.id
    LEFT JOIN customers
    ON demands.customerId = customers.id
    LEFT JOIN car_models
    ON demands.car_modelId = car_models.car_model_id
    LEFT JOIN car_types
    ON demands.car_typeId = car_types.car_type_id
    LEFT JOIN colors
    ON demands.colorId = colors.color_id
    LEFT JOIN demand_statuses
    ON demands.demand_statusId = demand_statuses.demand_status_id
    LEFT JOIN contact_types
    ON demands.contact_typeId = contact_types.contact_type_id
    LEFT JOIN customer_types
    ON demands.customer_typeId = customer_types.customer_type_id
    LEFT JOIN branches
    ON users.branchId = branches.branch_id
    LEFT JOIN provinces
    ON customers.provinceId = provinces.province_id
    WHERE branches.branch_name LIKE "%${branch_name}%"
    AND users.name LIKE "%${demand_employee_name}%"
    AND provinces.province_name LIKE "%${province_name}%"
    AND customer_types.customer_type_name LIKE "%${customer_type_name}%"
    AND contact_types.contact_type_name LIKE "%${contact_type_name}%"
    AND demand_statuses.demand_status_name LIKE "%${demand_status_name}%"
    AND car_models.car_model_name LIKE "%${car_model_name}%"
    AND car_types.car_type_name LIKE "%${car_type_name}%"
    AND users.username LIKE "%${username}%"
    AND UNIX_TIMESTAMP(demands.demand_date) BETWEEN UNIX_TIMESTAMP('${from_date}') AND UNIX_TIMESTAMP('${to_date}')
    AND demands.demand_hide = 1
      ORDER BY demands.id DESC`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.hide = (req, res) => {
    const id = req.params.id;
    const demand = {
        demand_hide: 1
    };

    Demand.update(demand, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: { heading: "Success !!!", message: "Form đã được cập nhật thành công" }
                });
            } else {
                res.status(400).send({
                    message: { heading: "Oh snap! You got an error!", message: `Cannot update Demand with id=${id}. Maybe Demand was not found or req.body is empty!` }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Demand with id=" + id + err
            });
            console.log(err)
        });
};

exports.unhide = (req, res) => {
    const id = req.params.id;
    const demand = {
        demand_hide: 0
    };

    Demand.update(demand, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: { heading: "Success !!!", message: "Form đã được cập nhật thành công" }
                });
            } else {
                res.status(400).send({
                    message: { heading: "Oh snap! You got an error!", message: `Cannot update Demand with id=${id}. Maybe Demand was not found or req.body is empty!` }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Demand with id=" + id + err
            });
            console.log(err)
        });
};

exports.findDemandStatusReport = (req, res) => {
    const branch_name = req.query.branch_name;
    const username = req.query.username;
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    const to_date_month = to_date.slice(5, 7);
    console.log(to_date_month)
    return db.sequelize.query(
        `  SELECT  
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 1 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong1,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 1 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai1,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 1 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich1,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 2 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong2,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 2 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai2,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 2 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich2,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 3 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong3,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 3 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai3,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 3 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich3,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 4 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong4,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 4 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai4,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 4 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich4,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 5 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong5,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 5 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai5,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 5 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich5,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 6 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong6,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 6 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai6,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 6 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich6,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 7 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong7,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 7 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai7,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 7 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich7,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 8 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong8,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 8 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai8,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 8 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich8,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 9 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong9,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 9 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai9,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 9 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich9,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 10 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong10,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 10 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai10,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 10 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich10,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 11 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong11,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 11 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai11,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 11 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich11,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 12 AND demands.demand_statusId = 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thanhcong12,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 12 AND demands.demand_statusId = 10 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS thatbai12,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND MONTH(demands.demand_date) = 12 AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS danggiaodich12,
        SUM(CASE WHEN branches.branch_name LIKE "%${branch_name}%" AND users.username LIKE "%${username}%" AND demands.demand_statusId < 9 AND demands.demand_hide = 0 THEN demands.demand_quantity END) AS tongcongdanggiaodich${to_date_month}
        FROM demands
        LEFT JOIN users ON demands.userId = users.id
        LEFT JOIN branches ON users.branchId = branches.branch_id
        WHERE UNIX_TIMESTAMP(demands.demand_date) BETWEEN UNIX_TIMESTAMP('${from_date}') AND UNIX_TIMESTAMP('${to_date}')`,
        { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};