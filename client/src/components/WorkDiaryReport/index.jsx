import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import DateFunc from "../../functions/datetime";
import { formatNumber } from "../../functions/number";
import AuthService from "../../services/auth.service";
import ReportService from "../../services/report.service";
import UnitService from "../../services/unit.service";

const WorkDiaryReport = () => {
  const [data, setData] = useState("");
  const [from_date, setFromDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1}`
  );
  const { projectId, id } = useParams();
  const [damageDate, setDamageDate] = useState("");
  const [damageContent, setDamageContent] = useState("");
  const [fixDate, setFixDate] = useState(null);
  const [sparePartCode, setSparePartCode] = useState("");
  const [sparePartName, setSparePartName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState("");
  const [units, setUnits] = useState([]);
  const [fixCrew, setFixCrew] = useState("");
  const [fixContent, setFixContent] = useState("");
  const [reportId, setReportId] = useState(null);
  const [unitId, setUnitId] = useState(null);

  const currentUser = AuthService.getCurrentUser();

  const fetchReports = useCallback(() => {
    ReportService.get_report_from_project(
      projectId,
      id,
      from_date,
      to_date
    ).then((response) => {
      setData(response.data);
    });
  }, [from_date, id, projectId, to_date]);

  const fetchUnits = useCallback(() => {
    UnitService.get_units().then((response) => {
      setUnits(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    const userId = currentUser.id;
    const vehicleId = id;
    e.preventDefault();
    ReportService.create_report(
      damageDate,
      damageContent,
      vehicleId,
      projectId,
      userId
    ).then(
      (response) => {
        alert("Gửi thành công!", response.message);
        window.location.reload();
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    ReportService.update_report(
      fixDate,
      fixContent,
      sparePartCode,
      sparePartName,
      quantity,
      fixCrew,
      price,
      note,
      unitId,
      reportId
    ).then(
      (response) => {
        alert("Update thành công!", response.message);
        window.location.reload();
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  useEffect(() => {
    fetchReports();
    fetchUnits();
  }, [fetchReports, fetchUnits]);

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
      <div className="flex justify-center space-x-4 mb-4">
        <div className="border border-slate-500">
          <p className="font-bold border border-slate-600 m-0.5">
            Thêm nhật ký
          </p>
          <form className="px-8 pt-6 text-left space-y-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold">
                Ngày hư hỏng
              </label>
              <input
                className="border border-slate-600"
                type="date"
                value={damageDate}
                onChange={(e) => setDamageDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold">
                Nội dung hư hỏng
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={damageContent}
                onChange={(e) => setDamageContent(e.target.value)}
              />
            </div>
            <button
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        </div>
        <div className="border border-slate-500 overflow-auto">
          <p className="font-bold border border-slate-600 m-0.5">
            Cập nhật nhật ký
          </p>
          <form className="px-8 pt-6 text-left space-y-2 flex flex-wrap items-center">
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                ID Báo cáo
              </label>
              <select
                className="border border-slate-600 max-w-[177px] w-full"
                onChange={(e) => setReportId(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Chọn
                </option>
                {data &&
                  data.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.id}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Ngày sửa chữa xong
              </label>
              <input
                className="border border-slate-600"
                type="date"
                value={fixDate}
                onChange={(e) => setFixDate(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Đội sửa chữa
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={fixCrew}
                onChange={(e) => setFixCrew(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Nội dung sửa chữa
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={fixContent}
                onChange={(e) => setFixContent(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Mã phụ tùng
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={sparePartCode}
                onChange={(e) => setSparePartCode(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Tên phụ tùng & thiết bị
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={sparePartName}
                onChange={(e) => setSparePartName(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                ĐVT
              </label>
              <select
                className="border border-slate-600 max-w-[177px] w-full"
                onChange={(e) => setUnitId(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Chọn
                </option>
                {units.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Số lượng
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Đơn giá (VNĐ)
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={price.toLocaleString()}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                Ghi chú
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </form>
          <button
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={handleUpdate}
          >
            Save
          </button>
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
                    {item.quantity ? item.quantity : ""}
                  </td>
                  <td className="border border-slate-700">
                    {item.price ? formatNumber(item.price) : 0}
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
export default WorkDiaryReport;
