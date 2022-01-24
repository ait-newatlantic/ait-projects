import React, { useCallback, useEffect, useRef, useState } from "react";

//Libraries
import { InputLabel } from "@material-ui/core";
import {
  BarChart,
  DonutChart,
  HorizontalBarChart,
} from "../DemandChart/DemandChart";

//Services
import DemandService from "../../services/demand.service";
import BranchService from "../../services/branch.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

//Functions
import DateFunc from "../../functions/datetime";

export default function DashBoard() {
  const [user, setUser] = useState("");
  const [branch_name, setBranchName] = useState("");
  const [username, setUserName] = useState("");
  const [branches, setBranches] = useState("");
  const [yearResult, setYearResult] = useState();
  const [yearResult1, setYearResult1] = useState();
  const currentUser = AuthService.getCurrentUser();
  const isInitialMount = useRef(true);

  const [from_date, setFromDate] = useState(`${DateFunc.year}-01-01`);
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );

  const [demand_statuses, setDemandStatuses] = useState([]);

  const onChangeFromDate = (e) => {
    const from_date = e.target.value;
    setFromDate(from_date);
  };

  const onChangeToDate = (e) => {
    const to_date = e.target.value;
    setToDate(to_date);
  };

  const handleSubmit = useCallback(() => {
    DemandService.get_demand_statuses(
      username,
      branch_name,
      from_date,
      to_date
    ).then((response) => {
      setDemandStatuses(response.data);
    });
    DemandService.get_demand_total(
      username,
      branch_name,
      from_date,
      to_date
    ).then((response) => {
      setYearResult(response.data);
    });
    DemandService.get_demand_quantity(
      username,
      branch_name,
      from_date,
      to_date
    ).then((response) => {
      setYearResult1(response.data);
    });
  }, [username, from_date, to_date, branch_name]);

  const FetchBranches = () => {
    BranchService.get_branchs().then((response) => {
      setBranches(response.data);
    });
  };

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
      } else {
        FetchBranches();
        handleSubmit();
      }
    });
  }, [currentUser.id, handleSubmit]);

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
      <div className="text-left">
        <h4 className="font-weight-bold text-dark">DASHBOARD</h4>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <InputLabel>Chi nhánh</InputLabel>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setBranchName(e.target.value)}
            >
              <option value="">Tất cả</option>
              {!!branches &&
                branches.map((Branch) => (
                  <option key={Branch.id} value={Branch.name}>
                    {Branch.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="col">
            <InputLabel>Từ ngày</InputLabel>
            <input
              type="date"
              className="form-control"
              name="from_date"
              value={from_date}
              onChange={onChangeFromDate}
            />
          </div>
          <div className="col">
            <InputLabel>Đến ngày</InputLabel>
            <input
              type="date"
              className="form-control"
              name="to_date"
              value={to_date}
              onChange={onChangeToDate}
            />
          </div>
        </div>
        <br />
      </div>
      <div className="row justify-content-center text-left">
        <div className="col-md-8 col-sm">
          <div className="card p-2">
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
        </div>
        <div className="col-md-4 col-sm">
          <div className="card p-2">
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
          <div className="card p-2">
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
        </div>
      </div>
    </div>
  );
}
