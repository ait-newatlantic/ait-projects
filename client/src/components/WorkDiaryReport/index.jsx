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
    `${DateFunc.year}-${DateFunc.n}-${Number(DateFunc.d) + 1 > 9 ? Number(DateFunc.d) + 1 : `0${Number(DateFunc.d)+1}`}`
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
  const [fixContent, setFixContent] = useState(null);
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
        alert("G???i th??nh c??ng!", response.message);
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
        alert("Update th??nh c??ng!", response.message);
        window.location.reload();
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  const handleSelectId = useCallback((e) => {
    const updatedData = data && data.filter(item => item.id === Number(e.target.value))
    setReportId(updatedData[0].id)
    setFixContent(updatedData[0].fixContent)
    setFixDate(updatedData[0].fixDate)
    setDamageContent(updatedData[0].damageContent)
    setDamageDate(updatedData[0].damageDate)
    setSparePartCode(updatedData[0].sparePartCode)
    setSparePartName(updatedData[0].sparePartName)
    setQuantity(updatedData[0].quantity)
    setFixCrew(updatedData[0].fixCrew)
    setPrice(updatedData[0].price)
    setNote(updatedData[0].note)
    console.log(updatedData)
  }, [data])

  useEffect(() => {
    fetchReports();
    fetchUnits();
  }, [fetchReports, fetchUnits]);

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">Nh???t k?? s???a ch???a b???o d?????ng</h3>
      <div className="flex space-x-2 justify-center items-center mb-4">
        <div className="border border-black">
          <span>T??? Ng??y: </span>
          <input
            id="from_date"
            type="date"
            value={from_date}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="border border-black">
          <span>?????n Ng??y: </span>
          <input
            id="to_date"
            type="date"
            value={to_date}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <div className="border border-slate-500">
          <p className="font-bold border border-slate-600 m-0.5 bg-slate-300">
            Th??m nh???t k??
          </p>
          <form className="px-8 pt-6 text-left space-y-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold ">
                Ng??y h?? h???ng
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
                N???i dung h?? h???ng
              </label>
              <input
                className="border border-slate-600"
                type="text"
                value={damageContent}
                onChange={(e) => setDamageContent(e)}
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
          <p className="font-bold border border-slate-600 m-0.5 bg-slate-300">
            C???p nh???t nh???t k??
          </p>
          <form className="px-8 pt-6 text-left space-y-2 flex flex-wrap items-center">
            <div className="w-1/5">
              <label className="block text-gray-700 text-sm font-bold">
                ID B??o c??o
              </label>
              <select
                className="border border-slate-600 max-w-[177px] w-full"
                onChange={handleSelectId}
              >
                <option value="" selected disabled hidden>
                  Ch???n
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
                Ng??y s???a ch???a xong
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
                ?????i s???a ch???a
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
                N???i dung s???a ch???a
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
                M?? ph??? t??ng
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
                T??n ph??? t??ng & thi???t b???
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
                ??VT
              </label>
              <select
                className="border border-slate-600 max-w-[177px] w-full"
                onChange={(e) => setUnitId(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Ch???n
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
                S??? l?????ng
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
                ????n gi?? (VN??)
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
                Ghi ch??
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
      <table className="table-auto border-separate border border-slate-500 w-full ">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600">STT</th>
            <th className="border border-slate-600">ID B??o c??o</th>

            <th className="border border-slate-600">N???i dung h?? h???ng</th>
            <th className="border border-slate-600">Ng??y s???a ch???a xong</th>
            <th className="border border-slate-600">?????i s???a ch???a</th>
            <th className="border border-slate-600">N???i dung s???a ch???a</th>
            <th className="border border-slate-600">M?? ph??? t??ng</th>
            <th className="border border-slate-600">
              T??n ph??? t??ng thi???t b??? & m??y m??c
            </th>
            <th className="border border-slate-600">??VT</th>
            <th className="border border-slate-600">S??? l?????ng</th>
            <th className="border border-slate-600">????n gi??</th>
            <th className="border border-slate-600">Th??nh ti???n</th>
            <th className="border border-slate-600">Ng??y h?? h???ng</th>
            <th className="border border-slate-600">Ghi ch??</th>
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
