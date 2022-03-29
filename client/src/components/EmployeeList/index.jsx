import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../../functions/date";
import UserService from "../../services/user.service";
import { getRole } from "../EmployeeAttendance";

const EmployeeList = () => {
    const [data, setData] = useState("")
    const { id } = useParams()

    const fetchUsers = useCallback(() => {
        UserService.get_users_from_project(id).then((response) => {
            setData(response.data);
        });
    }, [id])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <div className="container mx-auto text-center">
            <h3 className="mb-4 uppercase font-bold">Danh sách nhân sự</h3>
            <table className="table-auto border-separate border border-slate-500 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-600">STT</th>
                        <th className="border border-slate-600">Họ và tên</th>
                        <th className="border border-slate-600">Username</th>
                        <th className="border border-slate-600">Số điện thoại</th>
                        <th className="border border-slate-600">CCCD/CMND</th>
                        <th className="border border-slate-600">Chức vụ</th>
                        <th className="border border-slate-600">Tình trạng hiện tại</th>
                        <th className="border border-slate-600">Ngày bắt đầu</th>
                        <th className="border border-slate-600">Ngày kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th className="border border-slate-700">
                                    {index + 1}
                                </th>
                                <td className="border border-slate-700">
                                    {item.name}
                                </td>
                                <td className="border border-slate-700">
                                    {item.username}
                                </td>
                                <td className="border border-slate-700">
                                    {item.phone}
                                </td>
                                <td className="border border-slate-700">
                                    {item.socialId}
                                </td>
                                <td className="border border-slate-700">
                                    {item.Roles.map(item => {
                                        return (
                                            <p key={item.name}>{getRole(item.name)}</p>
                                        )
                                    })}
                                </td>
                                <td className="border border-slate-700">
                                    {item.working ? 'Đang làm việc' : 'Nghỉ việc'}
                                </td>
                                <td className="border border-slate-700">
                                    {formatTime(item.startDate)}
                                </td>
                                <td className="border border-slate-700">
                                    {formatTime(item.endDate)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default EmployeeList;