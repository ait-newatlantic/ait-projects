const db = require("../models");
const DemandHistory = db.demand_history;

exports.create = (req, res) => {
  const arr = req.body.arr;
  // Save Demand in the database
  return DemandHistory.create({
    date: arr.date,
    userId: arr.userId,
    employee: arr.employee,
    car_modelId: arr.car_modelId,
    car_typeId: arr.car_typeId,
    quantity: parseInt(arr.quantity),
    colorId: arr.colorId,
    demand_statusId: arr.demand_statusId,
    customerId: arr.customerId,
    customer_typeId: arr.customer_typeId,
    opinion: arr.opinion,
    meeting: arr.meeting,
    contact_typeId: arr.contact_typeId,
    note: arr.note,
    demandId: arr.id,
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
          err.message || "Some error occurred while creating the Demand.",
      });
      console.log(err);
    });
};
