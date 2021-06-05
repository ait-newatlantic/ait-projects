import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import CustomerService from "../../services/customer.service";
import DemandService from "../../services/demand.service";
import { CSVLink } from "react-csv";
import * as MaterialUIIcons from "@material-ui/icons/";

const headers = [
  { label: "Chi nhánh", key: "branchname" },
  { label: "Tên nhân viên", key: "user_name" },
  { label: "Khách hàng", key: "customername" },
  { label: "Địa chỉ khách hàng", key: "address" },
  { label: "SĐT khách hàng", key: "number" },
  { label: "Loại khách hàng", key: "bussiness_type" },
  { label: "Tên người đại diện", key: "manager" },
  { label: "SĐT người đại diện", key: "manager_number" },
  { label: "Email người đại diện", key: "manager_email" },
  { label: "Mã số thuế", key: "taxcode" },
  { label: "Khu vực khách hàng", key: "province" },
  { label: "Ngày tạo form", key: "createdAt" },
  { label: "Ngày cập nhật", key: "updatedAt" },
];

export default function DemandList() {
  const [customerResult, setcustomerResult] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [manager_number, setManagerNumber] = useState("");
  const [manager_email, setManagerEmail] = useState("");
  const [taxcode, setTaxCode] = useState("");
  const [username, setUserName] = useState("");
  const [user_name, setUser_Name] = useState("");
  const [employee, setEmployee] = useState("");
  const [province, setProvice] = useState("");
  const [customer_number, setCustomerNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [demand_status, setDemandStatus] = useState("");
  const [car_model, setCarModel] = useState("");
  const [car_type, setCarType] = useState("");
  const [customer_type, setCustomerType] = useState("");
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
  const [flag5, setFlag5] = useState(true);
  const [flag6, setFlag6] = useState(false);
  const [flag7, setFlag7] = useState(false);
  const [flag8, setFlag8] = useState(false);
  const [flag9, setFlag9] = useState(true);
  const [flag10, setFlag10] = useState(true);
  const [flag11, setFlag11] = useState(false);
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

  const handleSubmit = () => {
    const hide = 0;
    const order = 200;
    const datetype = "date";
    CustomerService.get_customers_filtered(
      branch,
      user_name,
      employee,
      province,
      customer,
      customer_number,
      customer_type,
      color,
      contact_type,
      demand_status,
      car_model,
      car_type,
      datetype,
      from_date,
      to_date,
      hide,
      order,
      limit,
    ).then((response) => {
      setcustomerResult(response.data);
      // setExcelData(
      //   response.data.map((i) => ({
      //     branchname: i.user.branch.name,
      //     user_name: i.user.name,
      //     customername: i.name,
      //     address: i.address,
      //     number: i.number,
      //     business_type: i.business_type.name,
      //     manager: i.manager,
      //     manager_number: i.manager_number,
      //     manager_email: i.manager_email,
      //     taxcode: i.taxcode,
      //     province: i.province.name,
      //     createdAt: i.createdAt.substring(0, 10),
      //     updatedAt: i.updatedAt.substring(0, 10),
      //   }))
      // );
    });
  };

  const onClickHide = (id) => {
    const hide = 1;
    CustomerService.hide_customer(hide, id).then((response) => {
      handleSubmit();
    });
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      {customerResult}
    </div>
  );
}
