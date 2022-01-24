import React, { useCallback, useRef, useState, useEffect } from "react";

//Libraries
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
import { CSVLink } from "react-csv";
import * as MaterialUIIcons from "@material-ui/icons/";

//Service
import DemandService from "../../services/demand.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

//Functions
import DateFunc from "../../functions/datetime";

const headers = [
  { label: "Chi nhánh", key: "branch" },
  { label: "Người nhập", key: "user" },
  { label: "Người gặp khách hàng", key: "employee" },
  { label: "Tên khách hàng", key: "customer" },
  { label: "SĐT khách hàng", key: "customer_number" },
  { label: "Loại khách hàng", key: "customer_type" },
  { label: "Khu vực khách hàng", key: "Pprovince" },
  { label: "Ý kiến khách hàng", key: "opinion" },
  { label: "Phương thức liên lạc", key: "contact_type" },
  { label: "Giai đoạn", key: "demand_status" },
  { label: "Model xe", key: "car_model" },
  { label: "Loại xe", key: "car_type" },
  { label: "Số lượng", key: "quantity" },
  { label: "Màu xe", key: "color" },
  { label: "Tình trạng hiện nay", key: "note" },
  { label: "Ngày giai đoạn", key: "date" },
  { label: "Ngày tạo form", key: "createdAt" },
  { label: "Ngày cập nhật", key: "updatedAt" },
];

export default function DemandList() {
  const [User, setUser] = useState([]);
  const [DemandResult, setDemandResult] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [branch_name, setBranchName] = useState(null);
  const [Customer_Type, setCustomerType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [opinion, setOpinion] = useState("");
  const [username, setUserName] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [employee, setEmployee] = useState("");
  const [Province, setProvice] = useState("");
  const [customer_number, setCustomerNumber] = useState("");
  const [Customer, setCustomer] = useState("");
  const [Demand_Status, setDemandStatus] = useState("");
  const [Car_Model, setCarModel] = useState("");
  const [Car_Type, setCarType] = useState("");
  const [Color, setColor] = useState("");
  const [Contact_Type, setContactType] = useState("");
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
  const isInitialMount = useRef(true);

  const currentUser = AuthService.getCurrentUser();

  const [from_date, setFromDate] = useState(`${DateFunc.year}-01-01`);
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );

  const onClickFlag = () => setFlag(!flag);

  const onClickFlag1 = () => setFlag1(!flag1);

  const onClickFlag2 = () => setFlag2(!flag2);

  const onClickFlag3 = () => setFlag3(!flag3);

  const onClickFlag4 = () => setFlag4(!flag4);

  const onClickFlag5 = () => setFlag5(!flag5);

  const onClickFlag6 = () => setFlag6(!flag6);

  const onClickFlag7 = () => setFlag7(!flag7);

  const onClickFlag8 = () => setFlag8(!flag8);

  const onClickFlag9 = () => setFlag9(!flag9);

  const onClickFlag10 = () => setFlag10(!flag10);

  const onClickFlag11 = () => setFlag11(!flag11);

  const onClickFlag12 = () => setFlag12(!flag12);

  const onClickFlag13 = () => setFlag13(!flag13);

  const onClickFlag14 = () => setFlag14(!flag14);

  const onClickFlag15 = () => setFlag15(!flag15);

  const onClickFlag16 = () => setFlag16(!flag16);

  const handleSubmit = useCallback(() => {
    const hide = 0;
    DemandService.get_demands_filtered(
      branch_name,
      user_name,
      employee,
      username,
      Province,
      Customer,
      customer_number,
      Customer_Type,
      Color,
      opinion,
      quantity,
      Contact_Type,
      Demand_Status,
      Car_Model,
      Car_Type,
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
          branch: i.User.Branch.name,
          user: i.User.name,
          employee: i.employee,
          customer: i.Customer.name,
          customer_number: i.Customer.number,
          customer_type: i.Customer_Type.name,
          province: i.Customer.Province.name,
          opinion: i.opinion,
          contact_type: i.Contact_Type.name,
          demand_status: i.Demand_Status.name,
          car_model: i.Car_Model.name,
          car_type: i.Car_Type.name,
          quantity: i.quantity,
          color: i.Color.name,
          note: i.note,
          date: i.date.substring(0, 10),
          createdAt: i.createdAt.substring(0, 10),
          updatedAt: i.updatedAt.substring(0, 10),
        }))
      );
    });
  }, [
    branch_name,
    user_name,
    employee,
    username,
    Province,
    Customer,
    customer_number,
    Customer_Type,
    Color,
    opinion,
    quantity,
    Contact_Type,
    Demand_Status,
    Car_Model,
    Car_Type,
    datetype,
    from_date,
    to_date,
    order,
    limit,
  ]);

  const getUser = useCallback(() => {
    UserService.get_user(currentUser.id).then((response) => {
      setUser(response.data);
      if (response.data.Roles[0].id === 4) {
        //User is an employee
        setUserName(response.data.username);
        setBranchName(response.data.Branch.name);
      } else if (response.data.Roles[0].id === 2) {
        //User is an moderator
        setBranchName(response.data.Branch.name);
      } else if (response.data.Roles[0].id === 3){
        setBranchName("");
      }
      else{}
    });
  }, [currentUser.id]);

  const onClickHide = (id) => {
    const hide = 1;
    DemandService.hide_demand(hide, id).then((response) => {
      handleSubmit();
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Your useEffect code here to be run on initial render
      getUser();
    } else {
      // Your useEffect code here to be run on update
      handleSubmit();
    }
  }, [handleSubmit, getUser]);

  return (
    <div>
      <div className="flex d-flex flex-wrap align-items-center justify-content-between rounded">
        <div className="flex d-flex flex-wrap align-items-center justify-content-start">
          <div>
            <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
              <MaterialUIIcons.FilterList />
            </button>
          </div>
          <div>
            <FormControl size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                onClick={(e) => setLimit(e.target.value)}
                disableUnderline
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
                <FormHelperText className="text-info">
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
                  <FormHelperText className="text-info">
                    Chi nhánh (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.User.Branch.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={branch_name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        getUser();
                      } else setBranchName(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.User.Branch.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag2 ? (
                <th>
                  <FormHelperText className="text-info">
                    Người nhập (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.User.name)
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
                        DemandResult.map((option) => option.User.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag3 ? (
                <th>
                  <FormHelperText className="text-info">
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
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag4 ? (
                <th>
                  <FormHelperText className="text-info">
                    Tên khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.Customer.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Customer}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCustomer("");
                      } else setCustomer(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Customer.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag5 ? (
                <th>
                  <FormHelperText className="text-info">
                    SĐT khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.Customer.number)
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
                        DemandResult.map((option) => option.Customer.number)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag6 ? (
                <th>
                  <FormHelperText className="text-info">
                    Loại khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map(
                            (option) => option.Customer_Type.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Customer_Type}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCustomerType("");
                      } else setCustomerType(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Customer_Type.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag7 ? (
                <th>
                  <FormHelperText className="text-info">
                    Khu vực khách hàng (
                    {
                      [
                        ...new Set(
                          DemandResult.map(
                            (option) => option.Customer.Province.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Province}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setProvice("");
                      } else setProvice(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map(
                          (option) => option.Customer.Province.name
                        )
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag8 ? (
                <th>
                  <FormHelperText className="text-info">
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
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag9 ? (
                <th>
                  <FormHelperText className="text-info">
                    Phương thức liên lạc (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.Contact_Type.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Contact_Type}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setContactType("");
                      } else setContactType(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Contact_Type.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag10 ? (
                <th>
                  <FormHelperText className="text-info">
                    Giai đoạn (
                    {
                      [
                        ...new Set(
                          DemandResult.map(
                            (option) => option.Demand_Status.name
                          )
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Demand_Status.name}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setDemandStatus("");
                      } else setDemandStatus(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Demand_Status.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag11 ? (
                <th>
                  <FormHelperText className="text-info">
                    Model xe (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.Car_Model.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Car_Model}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCarModel("");
                      } else setCarModel(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Car_Model.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag12 ? (
                <th>
                  <FormHelperText className="text-info">
                    Loại xe (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.Car_Type.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Car_Type}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setCarType("");
                      } else setCarType(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Car_Type.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag13 ? (
                <th>
                  <FormHelperText className="text-info">
                    Số lượng (
                    {[
                      DemandResult.map((option) => option.quantity).reduce(
                        (a, b) => a + b,
                        0
                      ),
                    ]}
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
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag14 ? (
                <th>
                  <FormHelperText className="text-info">
                    Màu xe (
                    {
                      [
                        ...new Set(
                          DemandResult.map((option) => option.Color.name)
                        ),
                      ].length
                    }
                    )
                  </FormHelperText>
                  <Autocomplete
                    value={Color}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setColor("");
                      } else setColor(newValue);
                    }}
                    options={[
                      ...new Set(
                        DemandResult.map((option) => option.Color.name)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" size="small" />
                    )}
                  />
                </th>
              ) : null}
              {flag15 ? (
                <th>
                  <FormHelperText className="text-info">
                    Tình hình hiện nay
                  </FormHelperText>
                </th>
              ) : null}
              {flag16 ? (
                <th colSpan="3">
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <FormHelperText className="text-info">
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
                          <MenuItem value="updatedAt">Ngày cập nhật</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs>
                      <FormHelperText className="text-info">
                        Từ ngày
                      </FormHelperText>
                      <TextField
                        size="small"
                        id="from_date"
                        type="date"
                        value={from_date}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs>
                      <FormHelperText className="text-info">
                        Đến ngày
                      </FormHelperText>
                      <TextField
                        size="small"
                        id="to_date"
                        type="date"
                        value={to_date}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </th>
              ) : null}
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {!!DemandResult &&
              DemandResult.map((i, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {flag1 ? <td>{i.User.Branch.name}</td> : null}
                  {flag2 ? <td>{i.User.name}</td> : null}
                  {flag3 ? <td>{i.employee}</td> : null}
                  {flag4 ? (
                    <td>
                      <Link
                        to={
                          "/dashboard/customers/update/" +
                          btoa(`${i.Customer.id}`)
                        }
                      >
                        {i.Customer.name}
                      </Link>
                    </td>
                  ) : null}
                  {flag5 ? <td>{i.Customer.number}</td> : null}
                  {flag6 ? <td>{i.Customer_Type.name}</td> : null}
                  {flag7 ? <td>{i.Customer.Province.name}</td> : null}
                  {flag8 ? <td>{i.opinion}</td> : null}
                  {flag9 ? <td>{i.Contact_Type.name}</td> : null}
                  {flag10 ? <td>{i.Demand_Status.name}</td> : null}
                  {flag11 ? <td>{i.Car_Model.name}</td> : null}
                  {flag12 ? <td>{i.Car_Type.name}</td> : null}
                  {flag13 ? <td>{i.quantity}</td> : null}
                  {flag14 ? <td>{i.Color.name}</td> : null}
                  {flag15 ? <td>{i.note}</td> : null}
                  {flag16 ? <td>Gặp ngày {i.date.substring(0, 10)}</td> : null}
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
                      className="btn btn-danger btn-sm"
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
