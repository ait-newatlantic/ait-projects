const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

//ADMIN
// Create and Save a new Demands
exports.create = (req, res) => {
    if (!req.body.customer_name ||
        !req.body.customer_number ||
        !req.body.customer_address ||
        !req.body.provinceId ||
        !req.body.business_typeId ||
        !req.body.userId) {
        res.status(400).send({
            message: { heading: "Oh snap! You got an error!", message: "Xin hãy điền đầy đủ thông tin: tên khách hàng, sđt, khu vực, loại khách hàng, mã số thuế khách hàng đối với doanh nghiệp!!!" }
        });
        return;
    }
    Customer.create({
        customer_name: req.body.customer_name,
        customer_number: req.body.customer_number,
        customer_address: req.body.customer_address,
        customer_manager: req.body.customer_manager,
        customer_manager_number: req.body.customer_manager_number,
        customer_manager_email: req.body.customer_manager_email,
        customer_taxcode: req.body.customer_taxcode,
        provinceId: req.body.provinceId,
        userId: req.body.userId,
        business_typeId: req.body.business_typeId
    })
        .then(data => {
            res.send({ message: { heading: "Success !!!", message: "Form đã được gửi thành công" }, data: data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
            console.log(err)
        });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
    return db.sequelize.query(
        ` SELECT 
        customers.id, customers.customer_name, customers.customer_number, customers.customer_manager,
        customers.createdAt, customers.updatedAt, customers.customer_manager_number, customers.customer_manager_email, 
        customers.customer_address, customers.customer_taxcode, branches.branch_name, users.name, business_types.business_type_name,
        provinces.province_name
        FROM customers
        JOIN provinces 
        ON customers.provinceId = provinces.province_id
        JOIN users 
        ON customers.userId = users.id
        JOIN business_types
        ON customers.business_typeId = business_types.business_type_id
        JOIN branches
        ON users.branchId = branches.branch_id
        WHERE customers.id = "${id}"`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findCustomerWithConditions = (req, res) => {
    const branch_name = req.query.branch_name;
    const customer_name = req.query.customer_name;
    const province_name = req.query.province_name;
    const business_type_name = req.query.business_type_name;
    const username = req.query.username;
    return db.sequelize.query(
        ` SELECT 
        customers.id, customers.customer_name, customers.customer_number, customers.customer_manager,
        customers.createdAt, customers.updatedAt, customers.customer_manager_number, customers.customer_manager_email, 
        customers.customer_address, customers.customer_taxcode, customers.customer_hide,
        branches.branch_name, 
        users.name, 
        users.username,
        business_types.business_type_name,
        provinces.province_name
        FROM customers
        JOIN provinces 
        ON customers.provinceId = provinces.province_id
        JOIN users 
        ON customers.userId = users.id
        JOIN business_types
        ON customers.business_typeId = business_types.business_type_id
        JOIN branches
        ON users.branchId = branches.branch_id
        WHERE branches.branch_name LIKE "%${branch_name}%" 
        AND customers.customer_name LIKE "%${customer_name}%"
        AND provinces.province_name LIKE "%${province_name}%"
        AND business_types.business_type_name LIKE "%${business_type_name}%"
        AND users.username LIKE "%${username}%"
        AND customers.customer_hide = 0
        ORDER BY customers.id DESC`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findCustomerWithConditionsHide = (req, res) => {
    const branch_name = req.query.branch_name;
    const customer_name = req.query.customer_name;
    const province_name = req.query.province_name;
    const username = req.query.username;
    const business_type_name = req.query.business_type_name;
    return db.sequelize.query(
        ` SELECT 
        customers.id, customers.customer_name, customers.customer_number, customers.customer_manager,
        customers.createdAt, customers.updatedAt, customers.customer_manager_number, customers.customer_manager_email, 
        customers.customer_address, customers.customer_taxcode, customers.customer_hide,
        branches.branch_name, 
        users.name, 
        users.username,
        business_types.business_type_name,
        provinces.province_name
        FROM customers
        JOIN provinces 
        ON customers.provinceId = provinces.province_id
        JOIN users 
        ON customers.userId = users.id
        JOIN business_types
        ON customers.business_typeId = business_types.business_type_id
        JOIN branches
        ON users.branchId = branches.branch_id
        WHERE branches.branch_name LIKE "%${branch_name}%" 
        AND customers.customer_name LIKE "%${customer_name}%"
        AND provinces.province_name LIKE "%${province_name}%"
        AND business_types.business_type_name LIKE "%${business_type_name}%"
        AND users.username LIKE "%${username}%"
        AND customers.customer_hide = 1
        ORDER BY customers.id DESC`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};

exports.findCustomerByName = (req, res) => {
    const customer_name = req.query.customer_name;
    return db.sequelize.query(` SELECT * FROM customers WHERE customer_name="${customer_name}" `, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};
// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const customer = {
        customer_manager: req.body.customer_manager,
        customer_manager_number: req.body.customer_manager_number,
        customer_manager_email: req.body.customer_manager_email,
    };

    Customer.update(customer, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: { heading: "Success !!!", message: "Form đã được cập nhật thành công" }
                });
            } else {
                res.status(400).send({
                    message: { heading: "Oh snap! You got an error!", message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!` }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

exports.hide = (req, res) => {
    const id = req.params.id;

    const customer = {
        customer_hide: 1
    };

    Customer.update(customer, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

exports.unhide = (req, res) => {
    const id = req.params.id;

    const customer = {
        customer_hide: 0
    };

    Customer.update(customer, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

exports.findQuantity = (req, res) => {
    employee = req.query.employee
    return db.sequelize.query(
        `SELECT
    SUM(employee LIKE '%NVL%') AS nvl,
    SUM(employee LIKE '%VUNGTAU%') AS vungtau,
    SUM(employee LIKE '%QUANGTRI%') AS quangtri,
    SUM(employee LIKE '%PDA%') AS pda,
    SUM(employee LIKE '%TAYNINH%') AS tayninh,
    SUM(employee LIKE '%DAKLAK%') AS daklak,
    SUM(employee LIKE '%DANANG%') AS danang,
    SUM(employee LIKE '%CANTHO%') AS cantho,
    SUM(employee LIKE '%BINHPHUOC%') AS binhphuoc,
    SUM(employee LIKE '%HUNGYEN%') AS hungyen,
    SUM(employee LIKE '%LAMDONG%') AS lamdong,
    SUM(employee LIKE '%DONGNAI%') AS dongnai,
    SUM(employee LIKE '%BINHDINH%') AS binhdinh,
    SUM(employee LIKE '%GIALAI%') AS gialai
    FROM customers`, { type: db.sequelize.QueryTypes.SELECT })
        .then(queues => res.json(queues))
        .catch(err => res.status(400).json(err));
};