import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import DemandService from "../../services/demand.service";
import { CSVLink } from "react-csv";
import * as MaterialUIIcons from "@material-ui/icons/";

const headers = [
  { label: "Ngày tạo form", key: "createdAt" },
  { label: "Ngày cập nhật", key: "updatedAt" },
];

export default function DemandList() {
  const [DemandResult, setDemandResult] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [branch_name, setBranchName] = useState("");
  const [customer_type, setCustomerType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [opinion, setOpinion] = useState("");
  const [username, setUserName] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [employee, setEmployee] = useState("");
  const [province, setProvice] = useState("");
  const [customer_number, setCustomerNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [demand_status, setDemandStatus] = useState("");
  const [car_model, setCarModel] = useState("");
  const [car_type, setCarType] = useState("");
  const [color, setColor] = useState("");
  const [contact_type, setContactType] = useState("");
  const [datetype, setDateType] = useState("");
  const [order, setOrderType] = useState("DESC");
  const [limit, setLimit] = useState(200);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(true);
  const [flag4, setFlag4] = useState(true);
  const [flag5, setFlag5] = useState(false);
  const [flag6, setFlag6] = useState(true);
  const [flag7, setFlag7] = useState(true);
  const [flag8, setFlag8] = useState(false);
  const [flag9, setFlag9] = useState(false);
  const [flag10, setFlag10] = useState(true);
  const [flag11, setFlag11] = useState(true);
  const [flag12, setFlag12] = useState(true);
  const [flag13, setFlag13] = useState(true);
  const [flag14, setFlag14] = useState(true);
  const [flag15, setFlag15] = useState(true);
  const [flag16, setFlag16] = useState(false);
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const n = month[newDate.getMonth()];
  const date = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const d = date[newDate.getDate() - 1];
  const [from_date, setFromDate] = useState(`${year}-01-01`);
  const [to_date, setToDate] = useState(`${year}-${n}-${d}`);

  const onClickFlag = () => {
    setFlag(!flag);
  };

  const onClickFlag1 = () => {
    setFlag1(!flag1);
  };

  const onClickFlag2 = () => {
    setFlag2(!flag2);
  };

  const onClickFlag3 = () => {
    setFlag3(!flag3);
  };

  const onClickFlag4 = () => {
    setFlag4(!flag4);
  };

  const onClickFlag5 = () => {
    setFlag5(!flag5);
  };

  const onClickFlag6 = () => {
    setFlag6(!flag6);
  };

  const onClickFlag7 = () => {
    setFlag7(!flag7);
  };

  const onClickFlag8 = () => {
    setFlag8(!flag8);
  };

  const onClickFlag9 = () => {
    setFlag9(!flag9);
  };

  const onClickFlag10 = () => {
    setFlag10(!flag10);
  };

  const onClickFlag11 = () => {
    setFlag11(!flag11);
  };

  const onClickFlag12 = () => {
    setFlag12(!flag12);
  };

  const onClickFlag13 = () => {
    setFlag13(!flag13);
  };

  const onClickFlag14 = () => {
    setFlag14(!flag14);
  };

  const onClickFlag15 = () => {
    setFlag15(!flag15);
  };

  const onClickFlag16 = () => {
    setFlag16(!flag16);
  };

  const handleSubmit = () => {
    const hide = 0;
    DemandService.get_demands_filtered(
      branch_name,
      user_name,
      employee,
      province,
      customer,
      customer_number,
      customer_type,
      color,
      opinion,
      quantity,
      note,
      contact_type,
      demand_status,
      car_model,
      car_type,
      datetype,
      from_date,
      to_date,
      hide,
      order,
      limit
    ).then((response) => {
      setDemandResult(response.data);
      setExcelData(
        response.data.map((i) => ({
          createdAt: i.createdAt.substring(0, 10),
          updatedAt: i.updatedAt.substring(0, 10),
        }))
      );
    });
  };

  const onClickHide = (id) => {
    const hide = 1;
    DemandService.hide_demand(hide, id).then((response) => {
      handleSubmit();
    });
  };

  useEffect(() => {
    handleSubmit();
  }, [
    branch_name,
    user_name,
    employee,
    province,
    customer,
    customer_number,
    customer_type,
    color,
    opinion,
    quantity,
    note,
    contact_type,
    demand_status,
    car_model,
    car_type,
    datetype,
    from_date,
    to_date,
    order,
    limit,
  ]);

  return (
    <div>
      <div className="justify-content-start">
        <h4 className="font-weight-bold text-dark text-left">BÁO CÁO</h4>
        <h6 className="flex d-flex flex-wrap font-weight-bold text-secondary text-left">
          Danh sách nhu cầu khách hàng mua xe
        </h6>
      </div>
      <div
        className="flex d-flex flex-wrap align-items-center justify-content-between"
        style={{ background: "#EEEEEE" }}
      >
        <div className="flex d-flex flex-wrap align-items-center justify-content-start">
          <div>
            <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
              <MaterialUIIcons.FilterList />
            </button>
          </div>
          <div>
            <FormControl variant="outlined" size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                onClick={(e) => setLimit(e.target.value)}
              >
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={600}>600</MenuItem>
                <MenuItem value={800}>800</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={null}>All</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex d-flex flex-wrap align-items-center justify-content-end">
          <div>
            <Link
              to="/dashboard/demands/input"
              className="btn btn-sm btn-hover"
              role="button"
            >
              <MaterialUIIcons.Add />
            </Link>
          </div>
          <div>
            <CSVLink
              headers={headers}
              data={excelData}
              className="btn btn-sm btn-hover"
              filename={"Báo cáo kinh doanh.csv"}
              target="_blank"
            >
              <MaterialUIIcons.GetApp />
            </CSVLink>
          </div>
        </div>
      </div>
      <div>
        {flag ? (
          <div className="bg-light">
            <div className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                inline
                label="Chi nhánh"
                defaultChecked={flag1}
                onClick={onClickFlag1}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Người nhập"
                defaultChecked={flag2}
                onClick={onClickFlag2}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Người gặp khách hàng"
                defaultChecked={flag3}
                onClick={onClickFlag3}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Tên khách hàng"
                defaultChecked={flag4}
                onClick={onClickFlag4}
              />
              <Form.Check
                type="checkbox"
                inline
                label="SĐT khách hàng"
                defaultChecked={flag5}
                onClick={onClickFlag5}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Loại khách hàng"
                defaultChecked={flag6}
                onClick={onClickFlag6}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Khu vực khách hàng"
                defaultChecked={flag7}
                onClick={onClickFlag7}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Ý kiến khách hàng"
                defaultChecked={flag8}
                onClick={onClickFlag8}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Phương thức liên lạc"
                defaultChecked={flag9}
                onClick={onClickFlag9}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Giai đoạn"
                defaultChecked={flag10}
                onClick={onClickFlag10}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Model xe"
                defaultChecked={flag11}
                onClick={onClickFlag11}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Loại xe"
                defaultChecked={flag12}
                onClick={onClickFlag12}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Số lượng"
                defaultChecked={flag13}
                onClick={onClickFlag13}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Màu xe"
                defaultChecked={flag14}
                onClick={onClickFlag14}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Tình hình hiện nay"
                defaultChecked={flag15}
                onClick={onClickFlag15}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Ngày"
                defaultChecked={flag16}
                onClick={onClickFlag16}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div style={{ overflow: "scroll", height: "80vh" }}>
        <Table id="emp" className="text-left" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <FormHelperText className="text-dark">
                  Total ({DemandResult.length})
                </FormHelperText>
                <FormControl>
                  <Select
                    labelId="order_type"
                    id="order_type"
                    displayEmpty
                    value={order}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <MenuItem value="DESC">Mới nhất</MenuItem>
                    <MenuItem value="ASC">Cũ nhất</MenuItem>
                  </Select>
                </FormControl>
              </th>
              {flag1 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Chi nhánh (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.user.branch.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={branch_name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setBranchName("");
                      } else setBranchName(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.user.branch.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag2 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Người nhập (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.user.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={user_name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setUser_Name("");
                      } else setUser_Name(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.user.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag3 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Người gặp khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.employee)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={employee}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setEmployee("");
                      } else setEmployee(newValue);
                    }}
                    options={[
                      ...new Set(DemandResult.map((option) => option.employee)),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag4 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Tên khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.customer.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={customer}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCustomer("");
                      } else setCustomer(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.customer.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag5 ? (
                <th>
                  <FormHelperText className="text-dark">
                    SĐT khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.customer.number)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={customer_number}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCustomerNumber("");
                      } else setCustomerNumber(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.customer.number)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag6 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Loại khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map(
                            (option) => option.customer_type.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={customer_type}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCustomerType("");
                      } else setCustomerType(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.customer_type.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag7 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Khu vực khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map(
                            (option) => option.customer.province.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={province}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setProvice("");
                      } else setProvice(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map(
                          (option) => option.customer.province.name
                        )
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag8 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Ý kiến khách hàng (
                    {
                      [...new Set(DemandResult.map((option) => option.opinion))]
                        .length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={opinion}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setOpinion("");
                      } else setOpinion(newValue);
                    }}
                    options={[
                      ...new Set(DemandResult.map((option) => option.opinion)),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag9 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Phương thức liên lạc (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.contact_type.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={contact_type}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setContactType("");
                      } else setContactType(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.contact_type.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag10 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Giai đoạn (
                    {
                      [
                        ...new Set(
                          DemandResult.map(
                            (option) => option.demand_status.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={demand_status.name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setDemandStatus("");
                      } else setDemandStatus(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.demand_status.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag11 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Model xe (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.car_model.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={car_model}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCarModel("");
                      } else setCarModel(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.car_model.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag12 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Loại xe (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.car_type.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={car_type}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCarType("");
                      } else setCarType(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.car_type.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag13 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Số lượng (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.quantity)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={quantity}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setQuantity("");
                      } else setQuantity(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => `${option.quantity}`)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag14 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Màu xe (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.color.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={color}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setColor("");
                      } else setColor(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.color.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag15 ? (
                <th>
                  <FormHelperText className="text-dark">
                    Tình hình hiện nay (
                    {
                      [...new Set(DemandResult.map((option) => option.note))]
                        .length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={note}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setNote("");
                      } else setNote(newValue);
                    }}
                    options={[
                      ...new Set(DemandResult.map((option) => option.note)),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </th>
              ) : null}
              {flag16 ? (
                <th colSpan="3">
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <FormHelperText className="text-dark">
                        Loại ngày
                      </FormHelperText>
                      <FormControl>
                        <Select
                          labelId="date_type"
                          id="date_type"
                          displayEmpty
                          value={datetype}
                          onChange={(e) => setDateType(e.target.value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="date">Ngày giai đoạn</MenuItem>
                          <MenuItem value="createdAt">Ngày tạo</MenuItem>
                          <MenuItem value="updatedAt">Ngày cập nhật</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs>
                      <FormHelperText className="text-dark">
                        Từ ngày
                      </FormHelperText>
                      <TextField
                        id="from_date"
                        type="date"
                        value={from_date}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs>
                      <FormHelperText className="text-dark">
                        Đến ngày
                      </FormHelperText>
                      <TextField
                        id="to_date"
                        type="date"
                        value={to_date}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {!!DemandResult &&
              DemandResult.map((i, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {flag1 ? <td>{i.user.branch.name}</td> : null}
                  {flag2 ? <td>{i.user.name}</td> : null}
                  {flag3 ? <td>{i.employee}</td> : null}
                  {flag4 ? <td>{i.customer.name}</td> : null}
                  {flag5 ? <td>{i.customer.number}</td> : null}
                  {flag6 ? <td>{i.customer_type.name}</td> : null}
                  {flag7 ? <td>{i.customer.province.name}</td> : null}
                  {flag8 ? <td>{i.opinion}</td> : null}
                  {flag9 ? <td>{i.contact_type.name}</td> : null}
                  {flag10 ? <td>{i.demand_status.name}</td> : null}
                  {flag11 ? <td>{i.car_model.name}</td> : null}
                  {flag12 ? <td>{i.car_type.name}</td> : null}
                  {flag13 ? <td>{i.quantity}</td> : null}
                  {flag14 ? <td>{i.color.name}</td> : null}
                  {flag15 ? <td>{i.note}</td> : null}
                  {flag16 ? <td>Gặp ngày {i.date.substring(0, 10)}</td> : null}
                  {flag16 ? (
                    <td>Tạo ngày {i.createdAt.substring(0, 10)}</td>
                  ) : null}
                  {flag16 ? (
                    <td>Cập nhật ngày {i.updatedAt.substring(0, 10)}</td>
                  ) : null}
                  <td>
                    <Link
                      className="btn btn-primary btn-sm"
                      to={"/dashboard/demands/update/" + btoa(`${i.id}`)}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onClickHide(i.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
