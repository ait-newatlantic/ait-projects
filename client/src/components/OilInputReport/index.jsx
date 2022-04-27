import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import DateFunc from "../../functions/datetime";
import { formatNumber } from "../../functions/number";
import ImportOilService from "../../services/import_gasoline.service";

export const OilInputReport = () => {
  const [data, setData] = useState('')
  const [from_date, setFromDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1}`
  );

  const { id } = useParams()

  const fetchImportOil = useCallback(() => {
    ImportOilService.get_import_oil_from_project(id, from_date, to_date).then((response) => {
      setData(response.data)
    })
  }, [from_date, id, to_date])

  useEffect(() => {
    fetchImportOil()
  }, [fetchImportOil])

  return (
    <div className="container mx-auto text-center">
      <p className="font-bold uppercase m-2">Quản lý nhập kho</p>
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
      <div className="flex justify-center space-x-4 w-full">
        <table className="table-auto border-separate border border-slate-700 text-center w-full">
          <thead className="font-bold">
            <tr>
              <th className="border border-slate-600">STT</th>
              <th className="border border-slate-600">Ngày nhập</th>
              <th className="border border-slate-600">Chứng từ</th>
              <th className="border border-slate-600">Mã hàng</th>
              <th className="border border-slate-600">Tên hàng</th>
              <th className="border border-slate-600">ĐVT</th>
              <th className="border border-slate-600">Số lượng</th>
              <th className="border border-slate-600">Đơn giá nhập</th>
              <th className="border border-slate-600">Thành tiền</th>
              <th className="border border-slate-600">Nhà cung cấp</th>
              <th className="border border-slate-600">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="border border-slate-600">{index + 1}</td>
                  <td className="border border-slate-600">{formatTime(item.importDate)}</td>
                  <td className="border border-slate-600">{item.importPaper}</td>
                  <td className="border border-slate-600">{item.code}</td>
                  <td className="border border-slate-600">{item.OilType.name}</td>
                  <td className="border border-slate-600">{item.Unit.name}</td>
                  <td className="border border-slate-600">{formatNumber(item.quantity)}</td>
                  <td className="border border-slate-600">{formatNumber(item.price)}</td>
                  <td className="border border-slate-600">{formatNumber(item.quantity * item.price)}</td>
                  <td className="border border-slate-600">{item.supplier}</td>
                  <td className="border border-slate-600">{item.note}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
