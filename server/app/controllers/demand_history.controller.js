const db = require("../models");
const DemandHistory = db.demand_history;

exports.create = (req, res) => {
  // Save Demand in the database
  return DemandHistory.create({
    demand_date: req.body.demand_date_2,
    userId: req.body.user_id,
    demand_employee: req.body.demand_employee,
    car_modelId: req.body.car_model_id,
    car_typeId: req.body.car_type_id,
    demand_quantity: req.body.demand_quantity,
    colorId: req.body.color_id_2,
    demand_statusId: req.body.demand_status_id_2,
    customerId: req.body.customer_id,
    customer_typeId: req.body.customer_type_id,
    demand_opinion: req.body.demand_opinion,
    demand_meeting: req.body.demand_meeting,
    contact_typeId: req.body.contact_type_id,
    demand_note: req.body.demand_note_2,
    demandId: req.body.demand_id,
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
