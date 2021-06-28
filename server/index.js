const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// force: true //will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
//     initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello there!" });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/branch.routes")(app);
require("./app/routes/province.routes")(app);
require("./app/routes/demand.routes")(app);
require("./app/routes/demand_history.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/business_type.routes")(app);
require("./app/routes/contact_type.routes")(app);
require("./app/routes/color.routes")(app);
require("./app/routes/demand_status.routes")(app);
require("./app/routes/customer_type.routes")(app);
require("./app/routes/car_type.routes")(app);
require("./app/routes/car_model.routes")(app);
require("./app/routes/option.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {}
