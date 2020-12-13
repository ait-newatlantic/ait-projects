const db = require("../models");
const Demand = db.demand;
const Sequelize = require('sequelize')
const Op = db.Sequelize.Op;
const Fn = db.Sequelize.fn;

//ADMIN

exports.create =  (req, res) => {
  // Validate request check if any thing missing!!!
  if (!req.body.customer || !
    req.body.customer_number ||
    !req.body.customer_area ||
    !req.body.model ||
    !req.body.type) {
    res.status(400).send({
      message: { heading: "Oh snap! You got an error!", message: " Xin vui lòng nhập thông tin khách hàng và thông tin xe đầy đủ!" }
    });
    return;
  }

  const initial = {
    arr: req.body.arr,
  }

  // Sav Demand in the database

  const requestArr = initial.arr.map(item => {
    return Demand.create({
      date: req.body.date,
      employee: req.body.employee,
      employee_field: req.body.employee_field,
      model: item.model,
      type: item.type,
      quantity: parseInt(item.quantity),
      color: item.color,
      status: req.body.status,
      customer: req.body.customer,
      customer_number: req.body.customer_number,
      customer_type: req.body.customer_type,
      customer_area: req.body.customer_area,
      customer_opinion: req.body.customer_opinion,
      customer_meeting: req.body.customer_meeting,
      customer_communication: req.body.customer_communication,
      note: req.body.note,
    })
  })
  return Promise.all(requestArr)
    .then(data => {
      res.send({ message: { heading: "Success !!!", message: "Form đã được gửi thành công" }, data: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Demand."
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Demand.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllDate = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  Demand.findAll({
    where: {
      [Op.or]: [
        {
          createdAt: {
            [Op.between]: [fromdate, todate]
          }
        },
        {
          updatedAt: {
            [Op.between]: [fromdate, todate]
          }
        },
        {
          date: {
            [Op.between]: [fromdate, todate]
          }
        }
      ]
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllCreatedAt = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  Demand.findAll({
    where: {
      createdAt: {
        [Op.between]: [fromdate, todate]
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllUpdatedAt = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  Demand.findAll({
    where: {
      updatedAt: {
        [Op.between]: [fromdate, todate]
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllGoAt = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  Demand.findAll({
    where: {
      date: {
        [Op.between]: [fromdate, todate]
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllTotal = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  return db.sequelize.query(
    `SELECT 
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  THEN quantity END) as tongcong,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="TIẾP CẬN CHÀO HÀNG" THEN quantity END) as tiepcanchaohang,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="CHẠY THỬ" THEN quantity END) as chaythu,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="ĐÀM PHÁN" THEN quantity END) as damphan,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="CHỐT ĐƠN HÀNG" THEN quantity END) as chotdonhang,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="ĐÃ CỌC" THEN quantity END) as dacoc,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="ĐÃ THANH TOÁN TẠM ỨNG" THEN quantity END) as dathanhtoantamung,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" THEN quantity END) as hoantatgiaodich,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="LÊN HỢP ĐỒNG" THEN quantity END) as lenhopdong,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="BÀN GIAO CHƯA THANH TOÁN" THEN quantity END) as bangiaochuathanhtoan,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="GIAO DỊCH THẤT BẠI" THEN quantity END) as giaodichthatbai
    FROM demands
         `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAllOverall = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  return db.sequelize.query(
    `SELECT 
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "1" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte1,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "1" THEN quantity END) as dukien1,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "2" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte2,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "2" THEN quantity END) as dukien2,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "3" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte3,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "3" THEN quantity END) as dukien3,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "4" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte4,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "4" THEN quantity END) as dukien4,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "5" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte5,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "5" THEN quantity END) as dukien5,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "6" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte6,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "6" THEN quantity END) as dukien6,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "7" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte7,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "7" THEN quantity END) as dukien7,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "8" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte8,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "8" THEN quantity END) as dukien8,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "9" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte9,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "9" THEN quantity END) as dukien9,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "10" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte10,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "10" THEN quantity END) as dukien10,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "11" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte11,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "11" THEN quantity END) as dukien11,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "12" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte12,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND MONTH(createdAt) = "12" THEN quantity END) as dukien12
         FROM demands`,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Demand.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Demand with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.date) {
    res.status(400).send({
      message: "Xin vui lòng nhập thông tin đầy đủ!"
    });
    return;
  }

  const demand = {
    date: req.body.date,
    status: req.body.status,
    ait: req.body.ait,
    kmt: req.body.kmt,
    color: req.body.color,
    note: req.body.note,
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
        message: "Error updating Demand with id=" + id
      });
    });
};

exports.findAllModels = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  return db.sequelize.query(
    `SELECT
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" THEN quantity END) as nvl_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" THEN quantity END) as vungtau_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" THEN quantity END) as daklak_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" THEN quantity END) as lamdong_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" THEN quantity END) as dongnai_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" THEN quantity END) as gialai_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" THEN quantity END) as binhphuoc_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" THEN quantity END) as cantho_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" THEN quantity END) as danang_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" THEN quantity END) as quanqtri_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" THEN quantity END) as hungyen_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" THEN quantity END) as binhduong_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" THEN quantity END) as binhdinh_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as nvl_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as vungtau_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as daklak_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as lamdong_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as dongnai_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as gialai_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as binhphuoc_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as cantho_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as danang_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as quanqtri_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as hungyen_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as binhduong_total_s,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as binhdinh_total_s,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="6540" THEN quantity END) as nvl_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="6540" THEN quantity END) as vungtau_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="6540" THEN quantity END) as daklak_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="6540" THEN quantity END) as lamdong_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="6540" THEN quantity END) as dongnai_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="6540" THEN quantity END) as gialai_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="6540" THEN quantity END) as binhphuoc_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="6540" THEN quantity END) as cantho_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="6540" THEN quantity END) as danang_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="6540" THEN quantity END) as quanqtri_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="6540" THEN quantity END) as hungyen_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="6540" THEN quantity END) as binhduong_6540_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="6540" THEN quantity END) as binhdinh_6540_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as nvl_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as vungtau_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as daklak_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as lamdong_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as dongnai_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as gialai_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as binhphuoc_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as cantho_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as danang_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as quanqtri_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as hungyen_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as binhduong_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as binhdinh_6540,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="6460" THEN quantity END) as nvl_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="6460" THEN quantity END) as vungtau_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="6460" THEN quantity END) as daklak_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%"  AND model ="6460" THEN quantity END) as lamdong_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="6460" THEN quantity END) as dongnai_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%"  AND model ="6460" THEN quantity END) as gialai_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="6460" THEN quantity END) as binhphuoc_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%"  AND model ="6460" THEN quantity END) as cantho_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%"  AND model ="6460" THEN quantity END) as danang_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%"  AND model ="6460" THEN quantity END) as quanqtri_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%"  AND model ="6460" THEN quantity END) as hungyen_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%"  AND model ="6460" THEN quantity END) as binhduong_6460_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%"  AND model ="6460" THEN quantity END) as binhdinh_6460_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as nvl_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as vungtau_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as daklak_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as lamdong_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as dongnai_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as gialai_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as binhphuoc_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as cantho_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as danang_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as quanqtri_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as hungyen_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as binhduong_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as binhdinh_6460,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="43253" THEN quantity END) as nvl_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="43253" THEN quantity END) as vungtau_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="43253" THEN quantity END) as daklak_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="43253" THEN quantity END) as lamdong_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="43253" THEN quantity END) as dongnai_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="43253" THEN quantity END) as gialai_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="43253" THEN quantity END) as binhphuoc_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="43253" THEN quantity END) as cantho_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="43253" THEN quantity END) as danang_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="43253" THEN quantity END) as quanqtri_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="43253" THEN quantity END) as hungyen_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="43253" THEN quantity END) as binhduong_43253_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="43253" THEN quantity END) as binhdinh_43253_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as nvl_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as vungtau_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as daklak_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as lamdong_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as dongnai_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as gialai_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as binhphuoc_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as cantho_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as danang_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as quanqtri_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as hungyen_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as binhduong_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as binhdinh_43253,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="43265" THEN quantity END) as nvl_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="43265" THEN quantity END) as vungtau_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="43265" THEN quantity END) as daklak_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="43265" THEN quantity END) as lamdong_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="43265" THEN quantity END) as dongnai_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="43265" THEN quantity END) as gialai_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="43265" THEN quantity END) as binhphuoc_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="43265" THEN quantity END) as cantho_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="43265" THEN quantity END) as danang_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="43265" THEN quantity END) as quanqtri_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="43265" THEN quantity END) as hungyen_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="43265" THEN quantity END) as binhduong_43265_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="43265" THEN quantity END) as binhdinh_43265_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as nvl_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as vungtau_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as daklak_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as lamdong_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as dongnai_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as gialai_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as binhphuoc_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as cantho_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as danang_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as quanqtri_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as hungyen_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as binhduong_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as binhdinh_43265,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="43266" THEN quantity END) as nvl_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="43266" THEN quantity END) as vungtau_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="43266" THEN quantity END) as daklak_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="43266" THEN quantity END) as lamdong_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="43266" THEN quantity END) as dongnai_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="43266" THEN quantity END) as gialai_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="43266" THEN quantity END) as binhphuoc_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="43266" THEN quantity END) as cantho_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="43266" THEN quantity END) as danang_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="43266" THEN quantity END) as quanqtri_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="43266" THEN quantity END) as hungyen_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="43266" THEN quantity END) as binhduong_43266_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="43266" THEN quantity END) as binhdinh_43266_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as nvl_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as vungtau_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as daklak_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as lamdong_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as dongnai_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as gialai_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as binhphuoc_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as cantho_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as danang_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as quanqtri_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as hungyen_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as binhduong_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as binhdinh_43266,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="53228" THEN quantity END) as nvl_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="53228" THEN quantity END) as vungtau_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="53228" THEN quantity END) as daklak_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="53228" THEN quantity END) as lamdong_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="53228" THEN quantity END) as dongnai_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="53228" THEN quantity END) as gialai_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="53228" THEN quantity END) as binhphuoc_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="53228" THEN quantity END) as cantho_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="53228" THEN quantity END) as danang_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="53228" THEN quantity END) as quanqtri_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="53228" THEN quantity END) as hungyen_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="53228" THEN quantity END) as binhduong_53228_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="53228" THEN quantity END) as binhdinh_53228_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as nvl_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as vungtau_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as daklak_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as lamdong_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as dongnai_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as gialai_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as binhphuoc_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as cantho_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as danang_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as quanqtri_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as hungyen_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as binhduong_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as binhdinh_53228,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="53229" THEN quantity END) as nvl_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="53229" THEN quantity END) as vungtau_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="53229" THEN quantity END) as daklak_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="53229" THEN quantity END) as lamdong_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="53229" THEN quantity END) as dongnai_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="53229" THEN quantity END) as gialai_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="53229" THEN quantity END) as binhphuoc_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="53229" THEN quantity END) as cantho_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="53229" THEN quantity END) as danang_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="53229" THEN quantity END) as quanqtri_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="53229" THEN quantity END) as hungyen_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="53229" THEN quantity END) as binhduong_53229_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="53229" THEN quantity END) as binhdinh_53229_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as nvl_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as vungtau_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as daklak_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as lamdong_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as dongnai_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as gialai_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as binhphuoc_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as cantho_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as danang_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as quanqtri_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as hungyen_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as binhduong_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as binhdinh_53229,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="65115" THEN quantity END) as nvl_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="65115" THEN quantity END) as vungtau_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="65115" THEN quantity END) as daklak_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="65115" THEN quantity END) as lamdong_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="65115" THEN quantity END) as dongnai_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="65115" THEN quantity END) as gialai_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="65115" THEN quantity END) as binhphuoc_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="65115" THEN quantity END) as cantho_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="65115" THEN quantity END) as danang_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="65115" THEN quantity END) as quanqtri_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="65115" THEN quantity END) as hungyen_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="65115" THEN quantity END) as binhduong_65115_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="65115" THEN quantity END) as binhdinh_65115_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as nvl_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as vungtau_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as daklak_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as lamdong_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as dongnai_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as gialai_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as binhphuoc_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as cantho_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as danang_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as quanqtri_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as hungyen_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as binhduong_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as binhdinh_65115,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="65116" THEN quantity END) as nvl_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="65116" THEN quantity END) as vungtau_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="65116" THEN quantity END) as daklak_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="65116" THEN quantity END) as lamdong_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="65116" THEN quantity END) as dongnai_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="65116" THEN quantity END) as gialai_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="65116" THEN quantity END) as binhphuoc_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="65116" THEN quantity END) as cantho_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="65116" THEN quantity END) as danang_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="65116" THEN quantity END) as quanqtri_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="65116" THEN quantity END) as hungyen_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="65116" THEN quantity END) as binhduong_65116_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="65116" THEN quantity END) as binhdinh_65116_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as nvl_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as vungtau_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as daklak_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as lamdong_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as dongnai_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as gialai_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as binhphuoc_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as cantho_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as danang_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as quanqtri_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as hungyen_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as binhduong_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as binhdinh_65116,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="65117" THEN quantity END) as nvl_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="65117" THEN quantity END) as vungtau_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="65117" THEN quantity END) as daklak_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="65117" THEN quantity END) as lamdong_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="65117" THEN quantity END) as dongnai_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="65117" THEN quantity END) as gialai_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="65117" THEN quantity END) as binhphuoc_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="65117" THEN quantity END) as cantho_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="65117" THEN quantity END) as danang_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="65117" THEN quantity END) as quanqtri_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="65117" THEN quantity END) as hungyen_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="65117" THEN quantity END) as binhduong_65117_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="65117" THEN quantity END) as binhdinh_65117_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as nvl_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as vungtau_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as daklak_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as lamdong_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as dongnai_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as gialai_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as binhphuoc_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as cantho_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as danang_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as quanqtri_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as hungyen_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as binhduong_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as binhdinh_65117,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as nvl_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as vungtau_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as daklak_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as lamdong_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as dongnai_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as gialai_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhphuoc_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as cantho_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as danang_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as quanqtri_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as hungyen_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhduong_c57_total,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhdinh_c57_total,

         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as nvl_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as vungtau_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as daklak_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as lamdong_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as dongnai_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as gialai_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhphuoc_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as cantho_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as danang_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as quanqtri_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as hungyen_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDUONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhduong_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHDINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhdinh_c57
        
         FROM demands`,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAllQuantity = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  return db.sequelize.query(
    `SELECT 
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="6540" THEN quantity END) as c6540,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="6460" THEN quantity END) as c6460,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="43253" THEN quantity END) as c43253,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="43265" THEN quantity END) as c43265,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="43266" THEN quantity END) as c43266,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="53228" THEN quantity END) as c53228,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="53229" THEN quantity END) as c53229,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="65115" THEN quantity END) as c65115,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="65116" THEN quantity END) as c65116,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="65117" THEN quantity END) as c65117,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND status="HOÀN TẤT GIAO DỊCH" AND model="Cẩu 5-7 tấn" THEN quantity END) as c57
    FROM demands
         `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};



//MODERATOR
exports.findAllSpecific = (req, res) => {
  const employee = req.query.employee;
  return db.sequelize.query(` SELECT * FROM demands WHERE employee LIKE "%${employee}%" `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAllQuantitySpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee

  return db.sequelize.query(
    `SELECT 
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="6540" THEN quantity END) as c6540,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="6460" THEN quantity END) as c6460,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="43253" THEN quantity END) as c43253,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="43265" THEN quantity END) as c43265,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="43266" THEN quantity END) as c43266,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="53228" THEN quantity END) as c53228,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="53229" THEN quantity END) as c53229,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="65115" THEN quantity END) as c65115,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="65116" THEN quantity END) as c65116,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="65117" THEN quantity END) as c65117,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="Cẩu 5-7 tấn" THEN quantity END) as c57
    FROM demands
         `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAllTotalSpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee
  return db.sequelize.query(
    `SELECT 
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" THEN quantity END) as tongcong,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="TIẾP CẬN CHÀO HÀNG" THEN quantity END) as tiepcanchaohang,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="CHẠY THỬ" THEN quantity END) as chaythu,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="ĐÀM PHÁN" THEN quantity END) as damphan,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="CHỐT ĐƠN HÀNG" THEN quantity END) as chotdonhang,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="ĐÃ CỌC" THEN quantity END) as dacoc,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="ĐÃ THANH TOÁN TẠM ỨNG" THEN quantity END) as dathanhtoantamung,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" THEN quantity END) as hoantatgiaodich,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="LÊN HỢP ĐỒNG" THEN quantity END) as lenhopdong,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="BÀN GIAO CHƯA THANH TOÁN" THEN quantity END) as bangiaochuathanhtoan,
    SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="GIAO DỊCH THẤT BẠI" THEN quantity END) as giaodichthatbai
    FROM demands
         `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));

};

exports.findAllOverallSpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  return db.sequelize.query(
    `SELECT 
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "1" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte1,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "1" THEN quantity END) as dukien1,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "2" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte2,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "2" THEN quantity END) as dukien2,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "3" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte3,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "3" THEN quantity END) as dukien3,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "4" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte4,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "4" THEN quantity END) as dukien4,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "5" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte5,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "5" THEN quantity END) as dukien5,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "6" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte6,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "6" THEN quantity END) as dukien6,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "7" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte7,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "7" THEN quantity END) as dukien7,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "8" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte8,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "8" THEN quantity END) as dukien8,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "9" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte9,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "9" THEN quantity END) as dukien9,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "10" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte10,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "10" THEN quantity END) as dukien10,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "11" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte11,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "11" THEN quantity END) as dukien11,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "12" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte12,
         SUM(CASE WHEN UNIX_TIMESTAMP(createdAt) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}')  AND employee LIKE "%${employee}%" AND MONTH(createdAt) = "12" THEN quantity END) as dukien12
         FROM demands`,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));

};


exports.findAllDateSpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee;
  Demand.findAll({
    where: {
      employee: {
        [Op.substring]: [employee]
      },
      [Op.or]: [
        {
          createdAt: {
            [Op.between]: [fromdate, todate]
          }
        },
        {
          updatedAt: {
            [Op.between]: [fromdate, todate]
          }
        },
        {
          date: {
            [Op.between]: [fromdate, todate]
          }
        }
      ]
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllCreatedAtSpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee;

  Demand.findAll({
    where: {
      employee: {
        [Op.substring]: [employee]
      },
      createdAt: {
        [Op.between]: [fromdate, todate]
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllUpdatedAtSpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  Demand.findAll({
    where: {
      updatedAt: {
        [Op.between]: [fromdate, todate]
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

exports.findAllGoAtSpecific = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;

  Demand.findAll({
    where: {
      date: {
        [Op.between]: [fromdate, todate]
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving demands."
      });
    });
};

