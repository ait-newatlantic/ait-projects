import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import DateFunc from "../../functions/datetime";
import AttendanceService from "../../services/attendance.service";
import logoTick from "../../assets/images/tick.png";
import { getRole } from "../EmployeeAttendance";
import { formatTime } from "../../functions/date";
import UserService from "../../services/user.service";

const EmployeeAttendanceReport = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [from_date, setFromDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1}`
  );
  const { id } = useParams();

  const fetchAttendace = useCallback(() => {
    AttendanceService.get_attendance_from_project(id, from_date, to_date).then(
      (response) => {
        setData(response.data);
      }
    );
  }, [from_date, id, to_date]);

  const fetchUsers = useCallback(() => {
    UserService.get_users_attendace_from_project(id).then((response) => {
      setUsers(response.data);
    });
  }, [id]);

  useEffect(() => {
    fetchAttendace();
    fetchUsers();
  }, [fetchAttendace, fetchUsers]);

  const Tick = () => {
    return <img className="h-6" src={logoTick} alt="tick" />;
  };

  const getShipTime = (hour) => {
    if (hour > 6 && hour < 11) {
      return "Ca 1";
    } else if (hour > 12 && hour < 18) {
      return "Ca 2";
    }
    return "Ca 3";
  };

  const getShipAmount = (username) => {
    const amount = data
      .filter((item) => item.User.username === username)
      .map((item) => (item.available ? 1 : 0))
      .reduce((partial_sum, a) => partial_sum + a, 0);
    return amount;
  };

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">Báo cáo điểm danh nhân sự</h3>
      <div className="flex space-x-2 justify-center items-center mb-4">
        <div className="border border-black">
          <span>Từ Ngày: </span>
          <input
            id="from_date"
            type="date"
            value={from_date}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="border border-black">
          <span>Đến Ngày: </span>
          <input
            id="from_date"
            type="date"
            value={to_date}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <table className="table-auto border-separate border border-slate-500 w-full">
          <thead>
            <tr className="bg-slate-300">
              <th className="border border-slate-600">STT</th>
              <th className="border border-slate-600">Họ và tên</th>
              <th className="border border-slate-600">Username</th>
              <th className="border border-slate-600">Số điện thoại</th>
              <th className="border border-slate-600">CCCD/CMND</th>
              <th className="border border-slate-600">Chức vụ</th>
              <th className="border border-slate-600">Ngày</th>
              <th className="border border-slate-600">Có mặt</th>
              <th className="border border-slate-600">Ca</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="border border-slate-700">{index + 1}</th>
                    <td className="border border-slate-700">
                      {item.User.name}
                    </td>
                    <td className="border border-slate-700">
                      {item.User.username}
                    </td>
                    <td className="border border-slate-700">
                      {item.User.phone}
                    </td>
                    <td className="border border-slate-700">
                      {item.User.socialId}
                    </td>
                    <td className="border border-slate-700">
                      {item.User.Roles.map((item) => {
                        return <p key={item.name}>{getRole(item.name)}</p>;
                      })}
                    </td>
                    <td className="border border-slate-700">
                      {formatTime(item.updatedAt)}
                    </td>
                    <td className="border border-slate-700 flex justify-center items-center">
                      {item.available ? <Tick /> : <div className="h-6" />}
                    </td>
                    <td className="border border-slate-700">
                      {getShipTime(new Date(item.updatedAt).getHours())}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <table className="table-auto border-separate border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">STT</th>
              <th className="border border-slate-600">Họ và tên</th>
              <th className="border border-slate-600">Số ca làm</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="border border-slate-700">{index + 1}</th>
                    <td className="border border-slate-700">{item.name}</td>
                    <td className="border border-slate-700">
                      {getShipAmount(item.username)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EmployeeAttendanceReport;
