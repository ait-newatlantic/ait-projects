const db = require("../models");
const Demand = db.demand;
const Op = db.Sequelize.Op;

//ADMIN
exports.create = (req, res) => {
  // Validate request check if any thing missing!!!
  if (!req.body.customer ||
    !req.body.customer_type ||
    !req.body.status ||
    !req.body.customer_communication ||
    !req.body.quantity ||
    !req.body.color ||
    !req.body.employee_field ||
    !req.body.employee ||
    !req.body.date ||
    !req.body.model ||
    !req.body.type ||
    req.body.arr && !req.body.arr.length) {
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
  employee = req.query.employee

  return db.sequelize.query(
    `SELECT
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as nvl_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as vungtau_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as daklak_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as lamdong_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as dongnai_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as gialai_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as binhphuoc_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as cantho_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as danang_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as quangtri_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as hungyen_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as tayninh_6540,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6540" THEN quantity END) as pda_6540,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as nvl_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as vungtau_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as daklak_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as lamdong_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as dongnai_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as gialai_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as binhphuoc_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as cantho_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as danang_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as quangtri_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as hungyen_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as tayninh_6460,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="6460" THEN quantity END) as pda_6460,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as nvl_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as vungtau_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as daklak_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as lamdong_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as dongnai_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as gialai_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as binhphuoc_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as cantho_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as danang_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as quangtri_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as hungyen_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as tayninh_43253,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43253" THEN quantity END) as pda_43253,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as nvl_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as vungtau_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as daklak_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as lamdong_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as dongnai_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as gialai_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as binhphuoc_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as cantho_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as danang_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as quangtri_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as hungyen_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as tayninh_43265,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43265" THEN quantity END) as pda_43265,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as nvl_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as vungtau_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as daklak_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as lamdong_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as dongnai_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as gialai_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as binhphuoc_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as cantho_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as danang_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as quangtri_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as hungyen_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as tayninh_43266,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="43266" THEN quantity END) as pda_43266,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as nvl_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as vungtau_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as daklak_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as lamdong_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as dongnai_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as gialai_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as binhphuoc_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as cantho_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as danang_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as quangtri_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as hungyen_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as tayninh_53228,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53228" THEN quantity END) as pda_53228,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as nvl_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as vungtau_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as daklak_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as lamdong_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as dongnai_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as gialai_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as binhphuoc_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as cantho_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as danang_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as quangtri_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as hungyen_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as tayninh_53229,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="53229" THEN quantity END) as pda_53229,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as nvl_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as vungtau_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as daklak_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as lamdong_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as dongnai_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as gialai_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as binhphuoc_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as cantho_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as danang_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as quangtri_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as hungyen_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as tayninh_65115,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65115" THEN quantity END) as pda_65115,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as nvl_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as vungtau_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as daklak_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as lamdong_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as dongnai_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as gialai_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as binhphuoc_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as cantho_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as danang_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as quangtri_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as hungyen_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as tayninh_65116,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65116" THEN quantity END) as pda_65116,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as nvl_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as vungtau_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as daklak_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as lamdong_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as dongnai_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as gialai_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as binhphuoc_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as cantho_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as danang_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as quangtri_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as hungyen_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as tayninh_65117,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="65117" THEN quantity END) as pda_65117,

         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%NVL%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as nvl_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%VUNGTAU%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as vungtau_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DAKLAK%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as daklak_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%LAMDONG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as lamdong_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DONGNAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as dongnai_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%GIALAI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as gialai_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%BINHPHUOC%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as binhphuoc_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%CANTHO%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as cantho_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%DANANG%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as danang_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%QUANGTRI%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as quangtri_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%HUNGYEN%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as hungyen_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%TAYNINH%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as tayninh_c57,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%PDA%" AND status ="HOÀN TẤT GIAO DỊCH" AND model ="Cẩu 5-7 tấn" THEN quantity END) as pda_c57
        
         FROM demands`,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAll = (req, res) => {
  const employee = req.query.employee;
  return db.sequelize.query(` SELECT * FROM demands WHERE employee LIKE "%${employee}%" `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAllQuantity = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee

  return db.sequelize.query(
    `SELECT 
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="6540" THEN quantity END) as c6540,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="6460" THEN quantity END) as c6460,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="43253" THEN quantity END) as c43253,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="43265" THEN quantity END) as c43265,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="43266" THEN quantity END) as c43266,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="53228" THEN quantity END) as c53228,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="53229" THEN quantity END) as c53229,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="65115" THEN quantity END) as c65115,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="65116" THEN quantity END) as c65116,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="65117" THEN quantity END) as c65117,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" AND model="Cẩu 5-7 tấn" THEN quantity END) as c57
    FROM demands
         `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));
};

exports.findAllTotal = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee
  return db.sequelize.query(
    `SELECT 
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" THEN quantity END) as tongcong,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="TIẾP CẬN CHÀO HÀNG" THEN quantity END) as tiepcanchaohang,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="CHẠY THỬ" THEN quantity END) as chaythu,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="ĐÀM PHÁN" THEN quantity END) as damphan,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="CHỐT ĐƠN HÀNG" THEN quantity END) as chotdonhang,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="ĐÃ CỌC" THEN quantity END) as dacoc,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="ĐÃ THANH TOÁN TẠM ỨNG" THEN quantity END) as dathanhtoantamung,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="HOÀN TẤT GIAO DỊCH" THEN quantity END) as hoantatgiaodich,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="LÊN HỢP ĐỒNG" THEN quantity END) as lenhopdong,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="BÀN GIAO CHƯA THANH TOÁN" THEN quantity END) as bangiaochuathanhtoan,
    SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN  UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND status="GIAO DỊCH THẤT BẠI" THEN quantity END) as giaodichthatbai
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
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "1" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte1,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "1" THEN quantity END) as dukien1,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "2" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte2,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "2" THEN quantity END) as dukien2,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "3" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte3,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "3" THEN quantity END) as dukien3,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "4" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte4,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "4" THEN quantity END) as dukien4,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "5" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte5,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "5" THEN quantity END) as dukien5,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "6" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte6,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "6" THEN quantity END) as dukien6,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "7" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte7,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "7" THEN quantity END) as dukien7,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "8" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte8,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "8" THEN quantity END) as dukien8,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "9" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte9,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "9" THEN quantity END) as dukien9,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "10" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte10,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "10" THEN quantity END) as dukien10,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "11" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte11,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "11" THEN quantity END) as dukien11,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "12" AND status ="HOÀN TẤT GIAO DỊCH" THEN quantity END) as thucte12,
         SUM(CASE WHEN UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%" AND MONTH(date) = "12" THEN quantity END) as dukien12
         FROM demands`,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));

};

exports.findAllDate = (req, res) => {
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

exports.findAllCreatedAt = (req, res) => {
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

// exports.findAllGoAt = (req, res) => {
//   fromdate = req.query.fromdate;
//   todate = req.query.todate;

//   Demand.findAll({
//     where: {
//       date: {
//         [Op.between]: [fromdate, todate]
//       }
//     }
//   })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving demands."
//       });
//     });
// };

exports.findAllGoAt = (req, res) => {
  fromdate = req.query.fromdate;
  todate = req.query.todate;
  employee = req.query.employee
  return db.sequelize.query(
    `SELECT 
   * FROM demands WHERE UNIX_TIMESTAMP(date) BETWEEN UNIX_TIMESTAMP('${fromdate}') AND UNIX_TIMESTAMP('${todate}') AND employee LIKE "%${employee}%"
         `,
    { type: db.sequelize.QueryTypes.SELECT })
    .then(queues => res.json(queues))
    .catch(err => res.status(400).json(err));

};

