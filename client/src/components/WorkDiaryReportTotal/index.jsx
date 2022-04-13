import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import DateFunc from "../../functions/datetime";
import ReportService from "../../services/report.service";

const WorkDiaryReportTotal = () => {
  const [data, setData] = useState("");
  const [from_date, setFromDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1}`
  );
  const { id } = useParams();
  const fetchReports = useCallback(() => {
    ReportService.get_reports_from_id(id, from_date, to_date).then(
      (response) => {
        setData(response.data);
      }
    );
  }, [from_date, id, to_date]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">Nhật ký sửa chữa bảo dưỡng</h3>
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
      <table className="table-auto border-separate border border-slate-500 w-full">
        <thead>
          <tr>
            <th className="border border-slate-600">STT</th>
            <th className="border border-slate-600">ID Báo cáo</th>
            <th className="border border-slate-600">Nội dung hư hỏng</th>
            <th className="border border-slate-600">Ngày sửa chữa xong</th>
            <th className="border border-slate-600">Đội sửa chữa</th>
            <th className="border border-slate-600">Nội dung sửa chữa</th>
            <th className="border border-slate-600">Mã phụ tùng</th>
            <th className="border border-slate-600">
              Tên phụ tùng thiết bị & máy móc
            </th>
            <th className="border border-slate-600">ĐVT</th>
            <th className="border border-slate-600">Số lượng</th>
            <th className="border border-slate-600">Đơn giá</th>
            <th className="border border-slate-600">Thành tiền</th>
            <th className="border border-slate-600">Ngày hư hỏng</th>
            <th className="border border-slate-600">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-700">{index + 1}</td>
                  <td className="border border-slate-700">{item.id}</td>

                  <td className="border border-slate-700">
                    {item.damageContent ? item.damageContent : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.fixDate ? formatTime(item.fixDate) : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.fixCrew ? item.fixCrew : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.fixContent ? item.fixContent : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.sparePartCode ? item.sparePartCode : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.sparePartName ? item.sparePartName : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.Unit ? item.Unit.name : ""}
                  </td>
                  <td className="border border-slate-700">
                    {(item.quantity ? item.quantity : "").toLocaleString()}
                  </td>
                  <td className="border border-slate-700">
                    {(item.price ? item.price : 0).toLocaleString()}
                  </td>
                  <td className="border border-slate-700">
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="border border-slate-700">
                    {formatTime(item.damageDate)}
                  </td>
                  <td className="border border-slate-700">
                    {item.note ? item.note : ""}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default WorkDiaryReportTotal;
