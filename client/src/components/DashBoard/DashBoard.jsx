import React, { useEffect, useState } from "react";
import * as MaterialUIIcons from "@material-ui/icons/";
import { InputLabel } from "@material-ui/core";
import DemandService from "../../services/demand.service";
import BranchService from "../../services/branch.service";
import {
  BarChart,
  DonutChart,
  HorizontalBarChart,
  LineChart,
} from "../DemandChart/DemandChart";
import { Table } from "react-bootstrap";

export default function DashBoard() {
  const [flag, setFlag] = useState(0);
  const [branch_name, setBranchName] = useState("");
  const [branches, setBranches] = useState("");
  const [yearResult, setYearResult] = useState();
  const [yearResult1, setYearResult1] = useState();
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
  const [demand_statuses, setDemandStatuses] = useState([]);

  const onChangeFromDate = (e) => {
    const from_date = e.target.value;
    setFromDate(from_date);
  };

  const onChangeToDate = (e) => {
    const to_date = e.target.value;
    setToDate(to_date);
  };

  const handleSubmit = () => {
    const username = "";
    DemandService.get_demand_statuses(
      username,
      branch_name,
      from_date,
      to_date
    ).then((response) => {
      setDemandStatuses(response.data);
    });
    DemandService.get_demand_total(branch_name, from_date, to_date).then(
      (response) => {
        setYearResult(response.data);
      }
    );
    DemandService.get_demand_quantity(branch_name, from_date, to_date).then(
      (response) => {
        setYearResult1(response.data);
      }
    );
  };

  const onClickFlag = () => {
    if (flag == 0) {
      setFlag(1);
    } else setFlag(0);
  };

  const FetchBranches = () => {
    BranchService.get_branchs().then((response) => {
      setBranches(response.data);
    });
  };

  useEffect(() => {
    handleSubmit();
    FetchBranches();
  }, [from_date, to_date, branch_name]);

  return (
    <div>
      <div className="text-left">
        <h4 className="font-weight-bold text-dark">DASHBOARD</h4>
        <h6 className="font-weight-bold text-secondary">
          Biểu đồ thống kê từ ngày {from_date} đến ngày {to_date}
        </h6>
      </div>
      <div
        className="d-flex justify-content-start rounded"
        style={{ background: "#EEEEEE" }}
      >
        <div>
          <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
            <MaterialUIIcons.FilterList />
          </button>
        </div>
      </div>
      {flag == 1 ? (
        <div>
          <div className="row">
            <div className="col">
              <InputLabel shrink>Chi nhánh</InputLabel>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={(e) => setBranchName(e.target.value)}
              >
                <option value="">Tất cả</option>
                {!!branches &&
                  branches.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col">
              <InputLabel shrink>Từ ngày</InputLabel>
              <input
                type="date"
                className="form-control"
                name="from_date"
                value={from_date}
                onChange={onChangeFromDate}
              />
            </div>
            <div className="col">
              <InputLabel shrink>Đến ngày</InputLabel>
              <input
                type="date"
                className="form-control"
                name="to_date"
                value={to_date}
                onChange={onChangeToDate}
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="row justify-content-center text-left">
        <div className="col-md-8 col-sm d-flex flex-column">
          <div
            className="flex-fill border rounded border-secondary p-2"
            style={{ overflow: "scroll" }}
          >
            {!!demand_statuses &&
              demand_statuses.map((month, index) => (
                <BarChart
                  key={index}
                  tongcongdanggiaodich1={month.tongcongdanggiaodich01}
                  tongcongdanggiaodich2={month.tongcongdanggiaodich02}
                  tongcongdanggiaodich3={month.tongcongdanggiaodich03}
                  tongcongdanggiaodich4={month.tongcongdanggiaodich04}
                  tongcongdanggiaodich5={month.tongcongdanggiaodich05}
                  tongcongdanggiaodich6={month.tongcongdanggiaodich06}
                  tongcongdanggiaodich7={month.tongcongdanggiaodich07}
                  tongcongdanggiaodich8={month.tongcongdanggiaodich08}
                  tongcongdanggiaodich9={month.tongcongdanggiaodich09}
                  tongcongdanggiaodich10={month.tongcongdanggiaodich10}
                  tongcongdanggiaodich11={month.tongcongdanggiaodich11}
                  tongcongdanggiaodich12={month.tongcongdanggiaodich12}
                  danggiaodich1={month.danggiaodich1}
                  thanhcong1={month.thanhcong1}
                  thatbai1={month.thatbai1}
                  danggiaodich2={month.danggiaodich2}
                  thanhcong2={month.thanhcong2}
                  thatbai2={month.thatbai2}
                  danggiaodich3={month.danggiaodich3}
                  thanhcong3={month.thanhcong3}
                  thatbai3={month.thatbai3}
                  danggiaodich4={month.danggiaodich4}
                  thanhcong4={month.thanhcong4}
                  thatbai4={month.thatbai4}
                  danggiaodich5={month.danggiaodich5}
                  thanhcong5={month.thanhcong5}
                  thatbai5={month.thatbai5}
                  danggiaodich6={month.danggiaodich6}
                  thanhcong6={month.thanhcong6}
                  thatbai6={month.thatbai6}
                  danggiaodich7={month.danggiaodich7}
                  thanhcong7={month.thanhcong7}
                  thatbai7={month.thatbai7}
                  danggiaodich8={month.danggiaodich8}
                  thanhcong8={month.thanhcong8}
                  thatbai8={month.thatbai8}
                  danggiaodich9={month.danggiaodich9}
                  thanhcong9={month.thanhcong9}
                  thatbai9={month.thatbai9}
                  danggiaodich10={month.danggiaodich10}
                  thanhcong10={month.thanhcong10}
                  thatbai10={month.thatbai10}
                  danggiaodich11={month.danggiaodich11}
                  thanhcong11={month.thanhcong11}
                  thatbai11={month.thatbai11}
                  danggiaodich12={month.danggiaodich12}
                  thanhcong12={month.thanhcong12}
                  thatbai12={month.thatbai12}
                />
              ))}
          </div>
          <br />
          <div
            className="border rounded border-secondary p-2"
            style={{ overflow: "scroll" }}
          >
            <label className="font-weight-bold text-uppercase">
              Bảng thống kê số lượng giao dịch hàng năm
            </label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Trang thái</th>
                  <th>Tháng 1</th>
                  <th>Tháng 2</th>
                  <th>Tháng 3</th>
                  <th>Tháng 4</th>
                  <th>Tháng 5</th>
                  <th>Tháng 6</th>
                  <th>Tháng 7</th>
                  <th>Tháng 8</th>
                  <th>Tháng 9</th>
                  <th>Tháng 10</th>
                  <th>Tháng 11</th>
                  <th>Tháng 12</th>
                </tr>
              </thead>
              {!!demand_statuses &&
                demand_statuses.map((month, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>Đang giao dịch trong tháng</td>
                      <td>{month.danggiaodich1}</td>
                      <td>{month.danggiaodich2}</td>
                      <td>{month.danggiaodich3}</td>
                      <td>{month.danggiaodich4}</td>
                      <td>{month.danggiaodich5}</td>
                      <td>{month.danggiaodich6}</td>
                      <td>{month.danggiaodich7}</td>
                      <td>{month.danggiaodich8}</td>
                      <td>{month.danggiaodich9}</td>
                      <td>{month.danggiaodich10}</td>
                      <td>{month.danggiaodich11}</td>
                      <td>{month.danggiaodich12}</td>
                    </tr>
                    <tr>
                      <td>Giao dịch thành công</td>
                      <td>{month.thanhcong1}</td>
                      <td>{month.thanhcong2}</td>
                      <td>{month.thanhcong3}</td>
                      <td>{month.thanhcong4}</td>
                      <td>{month.thanhcong5}</td>
                      <td>{month.thanhcong6}</td>
                      <td>{month.thanhcong7}</td>
                      <td>{month.thanhcong8}</td>
                      <td>{month.thanhcong9}</td>
                      <td>{month.thanhcong10}</td>
                      <td>{month.thanhcong11}</td>
                      <td>{month.thanhcong12}</td>
                    </tr>
                    <tr>
                      <td>Giao dịch thất bại</td>
                      <td>{month.thatbai1}</td>
                      <td>{month.thatbai2}</td>
                      <td>{month.thatbai3}</td>
                      <td>{month.thatbai4}</td>
                      <td>{month.thatbai5}</td>
                      <td>{month.thatbai6}</td>
                      <td>{month.thatbai7}</td>
                      <td>{month.thatbai8}</td>
                      <td>{month.thatbai9}</td>
                      <td>{month.thatbai10}</td>
                      <td>{month.thatbai11}</td>
                      <td>{month.thatbai12}</td>
                    </tr>
                    <tr>
                      <td>Đang giao dịch hiện tại</td>
                      <td>{month.tongcongdanggiaodich01}</td>
                      <td>{month.tongcongdanggiaodich02}</td>
                      <td>{month.tongcongdanggiaodich03}</td>
                      <td>{month.tongcongdanggiaodich04}</td>
                      <td>{month.tongcongdanggiaodich05}</td>
                      <td>{month.tongcongdanggiaodich06}</td>
                      <td>{month.tongcongdanggiaodich07}</td>
                      <td>{month.tongcongdanggiaodich08}</td>
                      <td>{month.tongcongdanggiaodich09}</td>
                      <td>{month.tongcongdanggiaodich10}</td>
                      <td>{month.tongcongdanggiaodich11}</td>
                      <td>{month.tongcongdanggiaodich12}</td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </div>
        </div>
        <div className="col-md-4 col-sm d-flex flex-column">
          <div
            className="border rounded border-secondary p-2"
            style={{ overflow: "scroll" }}
          >
            {!!yearResult &&
              yearResult.map((form, index) => (
                <DonutChart
                  key={index}
                  tiepcanchaohang={form.tiepcanchaohang}
                  chotdonhang={form.chotdonhang}
                  chaythu={form.chaythu}
                  damphan={form.damphan}
                  dacoc={form.dacoc}
                  dathanhtoantamung={form.dathanhtoantamung}
                  hoantatgiaodich={form.hoantatgiaodich}
                  bangiaochuathanhtoan={form.bangiaochuathanhtoan}
                  lenhopdong={form.lenhopdong}
                  giaodichthatbai={form.giaodichthatbai}
                />
              ))}
          </div>
          <br />
          <div
            className="border rounded border-secondary p-2"
            style={{ overflow: "scroll" }}
          >
            {!!yearResult1 &&
              yearResult1.map((quantity, index) => (
                <HorizontalBarChart
                  key={index}
                  c6540={quantity.c6540}
                  c6460={quantity.c6460}
                  c43253={quantity.c43253}
                  c43265={quantity.c43265}
                  c43266={quantity.c43266}
                  c53228={quantity.c53228}
                  c53229={quantity.c53229}
                  c65115={quantity.c65115}
                  c65116={quantity.c65116}
                  c65117={quantity.c65117}
                  c57={quantity.c57}
                />
              ))}
          </div>
          <br />
          <div
            className="border rounded border-secondary p-2"
            style={{ overflow: "scroll" }}
          >
            {!!demand_statuses &&
              demand_statuses.map((month, index) => (
                <LineChart
                  key={index}
                  thanhcong1={month.thanhcong1}
                  thanhcong2={month.thanhcong2}
                  thanhcong3={month.thanhcong3}
                  thanhcong4={month.thanhcong4}
                  thanhcong5={month.thanhcong5}
                  thanhcong6={month.thanhcong6}
                  thanhcong7={month.thanhcong7}
                  thanhcong8={month.thanhcong8}
                  thanhcong9={month.thanhcong9}
                  thanhcong10={month.thanhcong10}
                  thanhcong11={month.thanhcong11}
                  thanhcong12={month.thanhcong12}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
