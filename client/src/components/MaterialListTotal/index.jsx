import React, { useState, useEffect, useCallback } from "react";
import BrandService from "../../services/brand.service";
import ProjectService from "../../services/project.service";
import VehicleService from "../../services/vehicle.service";

const MaterialListTotal = () => {
    const [data, setData] = useState([])
    const [projects, setProjects] = useState([])
    const [brands, setBrands] = useState([])
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [brand, setBrand] = useState(1)
    const [registryDate, setRegistryDate] = useState('')
    const [plateNumber, setPlateNumber] = useState('')
    const [createdYear, setCreatedYear] = useState('')

    const fetchMaterials = useCallback(() => {
        VehicleService.get_vehicles().then((response) => {
            setData(response.data);
        });
    }, [])

    const fetchBrands = useCallback(() => {
        BrandService.get_brands().then((response) => {
            setBrands(response.data);
        });
    }, [])

    const fetchProjects = useCallback(() => {
        ProjectService.get_projects().then((response) => {
            setProjects(response.data);
        });
    }, [])

    const handleSelect = (e) => {
        e.preventDefault();
        VehicleService.update_vehicle(Number(e.target.value[0]), Number(e.target.value[2]));
    };

    const handleSelectBrand = (e) => {
        setBrand(Number(e.target.value))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        VehicleService.create_vehicle(
            name,
            brand,
            code,
            registryDate,
            plateNumber,
            createdYear
        ).then(
            (response) => {
                alert('Gửi thành công!', response.message);
                window.location.reload();
            },
            (error) => {
                alert(error.message)
            }
        );
    };

    useEffect(() => {
        fetchMaterials()
        fetchProjects()
        fetchBrands()
    }, [fetchBrands, fetchMaterials, fetchProjects])

    return (
        <div className="container mx-auto text-center">
            <h3 className="mb-4 uppercase font-bold">Danh sách thiết bị & máy móc toàn công ty</h3>
            <div className="border border-slate-500 mb-4">
                <p className="font-bold border border-slate-600 m-0.5">Thêm thiết bị</p>
                <form className="px-8 pt-6 pb-8 mb-4 text-left space-y-2 flex justify-between items-center">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">
                            Tên thiết bị
                        </label>
                        <input className="border border-slate-600" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">
                            Hãng
                        </label>
                        <select className="border border-slate-600" onChange={handleSelectBrand}>
                            {brands.map(brand => {
                                return (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">
                            Mã thiết bị
                        </label>
                        <input className="border border-slate-600" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">
                            Ngày đăng kiếm
                        </label>
                        <input className="border border-slate-600" type="date" value={registryDate} onChange={(e) => setRegistryDate(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">
                            Biển số
                        </label>
                        <input className="border border-slate-600" type="text" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">
                            Năm sản xuất
                        </label>
                        <input className="border border-slate-600" type="text" value={createdYear} onChange={(e) => setCreatedYear(e.target.value)} />
                    </div>
                </form>
                <button className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={handleSubmit}>
                    Save
                </button>
            </div>
            <table className="table-auto border-separate border border-slate-500 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-600">STT</th>
                        <th className="border border-slate-600">Tên thiết bị & máy móc</th>
                        <th className="border border-slate-600">Hãng xe</th>
                        <th className="border border-slate-600">Mã thiết bị & máy móc</th>
                        <th className="border border-slate-600">Ngày đăng kiểm</th>
                        <th className="border border-slate-600">Biển số</th>
                        <th className="border border-slate-600">Năm sản xuất</th>
                        <th className="border border-slate-600">Đang hoạt dộng</th>
                        <th className="border border-slate-600">Dự án</th>
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
                                    <a className="text-blue-600" href={`/work/diary/report/${item.id}`}>{item.name}</a>
                                </td>
                                <td className="border border-slate-700">
                                    {item.Brand ? item.Brand.name : "N/A"}
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
                                    {item.createdYear}
                                </td>
                                <td className="border border-slate-700">
                                    {item.isWorking ? 'Có' : 'Không'}
                                </td>
                                <td className="border border-slate-700">
                                    <select onChange={handleSelect}>
                                        <option value="" selected disabled hidden>{item.Project ? item.Project.name : 'N/A'}</option>
                                        {projects.map(project => {
                                            return (
                                                <option key={project.id} value={[item.id, project.id]}>{project.name}</option>
                                            )
                                        })}
                                        <option value={[item.id, null]}>N/A</option>
                                    </select>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default MaterialListTotal;