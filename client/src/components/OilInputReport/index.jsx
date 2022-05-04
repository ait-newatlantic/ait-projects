import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import DateFunc from "../../functions/datetime";
import { formatNumber } from "../../functions/number";
import AuthService from "../../services/auth.service";
import ImportOilService from "../../services/import_gasoline.service";
import OilTypeService from "../../services/oil_type.service";
import UnitService from "../../services/unit.service";

export const OilInputReport = () => {
  const [data, setData] = useState('')
  const [from_date, setFromDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${DateFunc.d}`
  );
  const [to_date, setToDate] = useState(
    `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1 > 9 ? Number(DateFunc.d) + 1 : `0${Number(DateFunc.d) + 1}`}`
  );

  const { id } = useParams()
  const [units, setUnits] = useState('')
  const [oils, setOils] = useState('')

  const currentUser = AuthService.getCurrentUser();

  const [importDate, setImportDate] = useState('')
  const [importPaper, setImportPaper] = useState('')
  const [code, setCode] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [supplier, setSupplier] = useState('')
  const [note, setNote] = useState('')
  const [oilTypeId, setOilTypeId] = useState(1)
  const [unitId, setUnitId] = useState(1)

  const fetchImportOil = useCallback(() => {
    ImportOilService.get_import_oil_from_project(id, from_date, to_date).then((response) => {
      setData(response.data)
    })
  }, [from_date, id, to_date])

  const fetchUnits = useCallback(() => {
    UnitService.get_units().then((response) => {
      setUnits(response.data)
    })
  }, [])

  const fetchOils = useCallback(() => {
    OilTypeService.get_oil_types().then((response) => {
      setOils(response.data)
    })
  }, [])

  const handleSubmit = (e) => {
    const userId = currentUser.id;
    const projectId = id
    e.preventDefault();
    ImportOilService.create_import_oil_report(
      importDate,
      importPaper,
      code,
      quantity,
      price,
      supplier,
      note,
      oilTypeId,
      unitId,
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


  useEffect(() => {
    fetchImportOil()
    fetchUnits()
    fetchOils()
  }, [fetchImportOil, fetchOils, fetchUnits])

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
              <th className="border border-slate-600">Ngày nhập</th>
              <th className="border border-slate-600">Chứng từ</th>
              <th className="border border-slate-600">Mã hàng</th>
              <th className="border border-slate-600">Tên hàng</th>
              <th className="border border-slate-600">ĐVT</th>
              <th className="border border-slate-600">Số lượng</th>
              <th className="border border-slate-600">Đơn giá nhập</th>
              <th className="border border-slate-600">Nhà cung cấp</th>
              <th className="border border-slate-600">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='date' value={importDate} onChange={(e) => setImportDate(e.target.value)} /></td>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='text' value={importPaper} onChange={(e) => setImportPaper(e.target.value)} /></td>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='text' value={code} onChange={(e) => setCode(e.target.value)} /></td>
              <td className="border border-slate-600">
                <select value={oilTypeId} onClick={(e) => setOilTypeId(e.target.value)}>
                  {oils && oils.map(oil => {
                    return (
                      <option key={oil.id} value={oil.id}>{oil.name}</option>
                    )
                  })}
                </select>
              </td>
              <td className="border border-slate-600">
                <select value={unitId} onClick={(e) => setUnitId(e.target.value)}>
                  {units && units.map(unit => {
                    return (
                      <option key={unit.id} value={unit.id}>{unit.name}</option>
                    )
                  })}
                </select>
              </td>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='text' value={price} onChange={(e) => setPrice(e.target.value)} /></td>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='text' value={supplier} onChange={(e) => setSupplier(e.target.value)} /></td>
              <td className="border border-slate-600"><input className=" bg-gray-300 w-full text-center" type='text' value={note} onChange={(e) => setNote(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-2">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      <div className="flex justify-center space-x-4 w-full mt-2">
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
