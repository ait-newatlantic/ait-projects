import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import DateFunc from "../../functions/datetime";
import ReportService from "../../services/report.service";

const Report = () => {
  const [data, setData] = useState("");
  const from_date = `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`;
  const to_date = `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1}`;
  const { id } = useParams();

  const fetchReports = useCallback(() => {
    ReportService.get_daily_report(id, from_date, to_date).then((response) => {
      setData(response.data);
    });
  }, [from_date, id, to_date]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">
        Báo cáo hàng ngày {from_date}
      </h3>
      <table className="table-auto border-separate border border-slate-500 w-full">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600">STT</th>
            <th className="border border-slate-600">Xe</th>
            <th className="border border-slate-600">Mã xe</th>
            <th className="border border-slate-600">ID Báo cáo</th>
            <th className="border border-slate-600">Ngày hư hỏng</th>
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
            <th className="border border-slate-600">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-700">{index + 1}</td>
                  <td className="border border-slate-700">
                    <a
                      className="text-blue-600"
                      href={`/work/diary/report/${id}/${item.Vehicle.id}`}
                    >
                      {item.Vehicle.name}
                    </a>
                  </td>
                  <td className="border border-slate-700">
                    {item.Vehicle.code}
                  </td>
                  <td className="border border-slate-700">{item.id}</td>
                  <td className="border border-slate-700">
                    {formatTime(item.damageDate)}
                  </td>
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
                    {item.quantity ? item.quantity : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.price ? item.price : 0}
                  </td>
                  <td className="border border-slate-700">
                    {item.price * item.quantity}
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
export default Report;
