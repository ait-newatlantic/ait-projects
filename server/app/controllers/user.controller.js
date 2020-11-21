exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Chức vụ: Nhân viên");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Chức vụ: Admin");
};

exports.moderatorBoard = (req, res) => { 
  res.status(200).send("Chức vụ: Chuyên viên");
};
