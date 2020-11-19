exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Nhân viên");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin");
};

exports.moderatorBoard = (req, res) => { 
  res.status(200).send("Nhân Viên");
};
