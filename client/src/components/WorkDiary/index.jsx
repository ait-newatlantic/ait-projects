import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import VehicleService from "../../services/vehicle.service";

const WorkDiary = () => {
  const [data, setData] = useState("");
  const { id } = useParams();

  const fetchMaterials = useCallback(() => {
    VehicleService.get_vehicle_from_project(id).then((response) => {
      setData(response.data);
    });
  }, [id]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return (
    <div className="container mx-auto text-center">
      <h3 className="mb-4 uppercase font-bold">
        Nhật ký sửa chữa bảo dưỡng xe
      </h3>
      <table className="table-auto border-separate border border-slate-500 w-full">
        <thead>
          <tr className="bg-slate-300">
            <th className="border border-slate-600">STT</th>
            <th className="border border-slate-600">Tên thiết bị & máy móc</th>
            <th className="border border-slate-600">Mã thiết bị & máy móc</th>
            <th className="border border-slate-600">Ngày đăng kiểm</th>
            <th className="border border-slate-600">Biển số</th>
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
                      href={`/work/diary/report/${id}/${item.id}`}
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="border border-slate-700">{item.code}</td>
                  <td className="border border-slate-700">
                    {item.registryDate}
                  </td>
                  <td className="border border-slate-700">
                    {item.plateNumber}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default WorkDiary;
