import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import VehicleService from "../../services/vehicle.service";

const WorkDiaryStatus = () => {
    const [data, setData] = useState("")
    const { id } = useParams()

    const fetchMaterials = useCallback(() => {
        VehicleService.get_vehicle_from_project(id).then((response) => {
            setData(response.data);
        });
    }, [id])

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        VehicleService.update_vehicle_status(Number(e.target.value[0]), Number(e.target.value[2]));
        window.location.reload(false);
    };

    useEffect(() => {
        fetchMaterials()
    }, [fetchMaterials])

    return (
        <div className="container mx-auto text-center">
            <h3 className="mb-4 uppercase font-bold">Tình trạng thiết bị & máy móc</h3>
            <table className="table-auto border-separate border border-slate-500 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-600">STT</th>
                        <th className="border border-slate-600">Tên thiết bị & máy móc</th>
                        <th className="border border-slate-600">Mã thiết bị & máy móc</th>
                        <th className="border border-slate-600">Ngày đăng kiểm</th>
                        <th className="border border-slate-600">Biển số</th>
                        <th className="border border-slate-600">Xe đang hoạt động</th>
                        {/* <th className="border border-slate-600">Nội dung tình trạng thiết bị</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="border border-slate-700">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700">
                                    {item.name}
                                </td>
                                <td className="border border-slate-700">
                                    {item.code}
                                </td>
                                <td className="border border-slate-700">
                                    {item.registryDate}
                                </td>
                                <td className="border border-slate-700">
                                    {item.plateNumber}
                                </td>
                                <td className="border border-slate-700">
                                    <input type="checkbox" defaultChecked={item.isWorking} value={[item.id, item.isWorking ? 0 : 1]} className="form-check-input" id="exampleCheck1" onChange={handleUpdateStatus} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default WorkDiaryStatus;