import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import AttendanceService from "../../services/attendance.service";
import UserService from "../../services/user.service";

export const getRole = (role) => {
  if (role === "driver") {
    return "Tài xế";
  }
  if (role === "admin") {
    return "Admin";
  }
  if (role === "techinician") {
    return "Kỹ thuật viên";
  }
  if (role === "accountant") {
    return "Kế toán";
  }
  if (role === "manager") {
    return "Quản lý";
  }
  return "Người dùngÏ";
};

const EmployeeAttendance = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill({ userId: 0, projectId: 0, available: false })
  );

  const handleInputChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return {
        userId: item.userId,
        projectId: item.projectId,
        available: index === position ? !item.available : item.available,
      };
    });
    setCheckedState(updatedCheckedState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AttendanceService.create_attendances(checkedState).then(
      (response) => {
        alert("Gửi thành công!", response.message);
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  const date = new Date();
  const hour = date.getHours();

  const getShipTime = () => {
    if (hour > 6 && hour < 11) {
      return "Ca 1 (6h - 11h30)";
    } else if (hour > 12 && hour < 18) {
      return "Ca 2 (12h30 - 18h)";
    }
    return "Ca 3 (19h - 23h30)";
  };

  const fetchUsers = useCallback(() => {
    UserService.get_users_attendace_from_project(id).then((response) => {
      setData(response.data);
      const newData = response.data.map((item) => {
        return { userId: item.id, projectId: Number(id), available: false };
      });
      setCheckedState(newData);
    });
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">
        Điểm danh nhân sự ngày {formatTime(date)} - {getShipTime()}
      </h3>
      <table className="table-auto border-separate border border-slate-500 w-full">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600">STT</th>
            <th className="border border-slate-600">Họ và tên</th>
            <th className="border border-slate-600">Username</th>
            <th className="border border-slate-600">Số điện thoại</th>
            <th className="border border-slate-600">CCCD/CMND</th>
            <th className="border border-slate-600">Chức vụ</th>
            <th className="border border-slate-600">Tình trạng hiện tại</th>
            <th className="border border-slate-600">Ngày bắt đầu</th>
            <th className="border border-slate-600">Ngày kết thúc</th>
            <th className="border border-slate-600">Có mặt</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th className="border border-slate-700">{index + 1}</th>
                  <td className="border border-slate-700">{item.name}</td>
                  <td className="border border-slate-700">{item.username}</td>
                  <td className="border border-slate-700">{item.phone}</td>
                  <td className="border border-slate-700">{item.socialId}</td>
                  <td className="border border-slate-700">
                    {item.Roles.map((item) => {
                      return <p key={item.name}>{getRole(item.name)}</p>;
                    })}
                  </td>
                  <td className="border border-slate-700">
                    {item.working ? "Đang làm việc" : "Nghỉ việc"}
                  </td>
                  <td className="border border-slate-700">
                    {formatTime(item.startDate)}
                  </td>
                  <td className="border border-slate-700">
                    {formatTime(item.endDate)}
                  </td>
                  <td className="border border-slate-700">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`custom-checkbox-${index}`}
                      name={item.name}
                      value={item.index}
                      checked={
                        checkedState[
                          { userId: null, projectId: null, available: index }
                        ]
                      }
                      onChange={() => handleInputChange(index)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};
export default EmployeeAttendance;
