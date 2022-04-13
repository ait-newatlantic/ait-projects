import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">Danh mục quản lý</h3>
      <div className="flex justify-center space-x-4 w-full">
        <div className="w-1/3">
          <h3 className="text-left uppercase font-semibold text-sm">
            Quản lý nhân sự
          </h3>
          <table className="table-auto border-separate border border-slate-500 w-full">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-slate-600">STT</th>
                <th className="border border-slate-600">Danh mục</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-slate-700">1</th>
                <td className="border border-slate-700">
                  <a href={`/employee/list/${id}`}>Danh sách nhân sự</a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">2</th>
                <td className="border border-slate-700">
                  <a href={`/employee/attendance/${id}`}>Điểm danh nhân sự</a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">3</th>
                <td className="border border-slate-700">
                  <a href={`/employee/attendance/report/${id}`}>
                    Nhật ký điểm danh
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <h3 className="text-left uppercase font-semibold text-sm">
            Quản lý thiết bị & máy móc
          </h3>
          <table className="table-auto border-separate border border-slate-500 w-full">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-slate-600">STT</th>
                <th className="border border-slate-600">Danh mục</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-slate-700">1</th>
                <td className="border border-slate-700">
                  <a href={`/material/list/${id}`}>
                    Danh sách thiết bị & máy móc
                  </a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">2</th>
                <td className="border border-slate-700">
                  <a href={`/gasoline/list/${id}`}>Quản lý xăng dầu</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <h3 className="text-left uppercase font-semibold text-sm">
            Quản lý công việc
          </h3>
          <table className="table-auto border-separate border border-slate-500 w-full">
            <thead>
              <tr className="bg-slate-300">
                <th className="border border-slate-600">STT</th>
                <th className="border border-slate-600">Danh mục</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-slate-700">1</th>
                <td className="border border-slate-700">
                  <a href={`/work/status/${id}`}>Tình trạng thiết bị</a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">2</th>
                <td className="border border-slate-700">
                  <a href={`/work/diary/${id}`}>Nhật ký sửa chữa bảo dưỡng</a>
                </td>
              </tr>
              <tr>
                <th className="border border-slate-700">3</th>
                <td className="border border-slate-700">
                  <a href={`/report/${id}`}>Báo cáo hàng ngày</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
