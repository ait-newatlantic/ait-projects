import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import api from "../../api/index"

export default function DSKH() {
    
    const [customerResult, setCustomerResult] = useState();

    useEffect(() => {
        api.get("/api/get/khachhang").then((response) => {
            setCustomerResult(response.data)
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="container p-3 my-3 border border-dark">
                <h1>DANH SÁCH KHÁCH HÀNG</h1>
                <table className="table-sm">
                    <tbody >
                        <tr>
                            <th>ID</th>
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại khách hàng</th>
                            <th>Loại khách hàng</th>
                            <th>Tên người đại diện</th>
                            <th>Số điện thoại người đại diện</th>
                            <th>Email người đại diện</th>
                            <th>Mã số thuế</th>
                            <th>Khách hàng thuộc khu vực</th>
                            <th>Địa chỉ khách hàng</th>       
                            <th>Cập nhật</th>              
                        </tr>
                        {!!customerResult && customerResult.map(form => (
                            <tr className="content" key={form._id}>
                                <td>{form.id}</td>
                                <td>{form.customer}</td>
                                <td>{form.customer_number}</td>
                                <td>{form.customer_type}</td>
                                <td>{form.customer_representative}</td>
                                <td>{form.customer_representative_number}</td>
                                <td>{form.customer_representative_email}</td>
                                <td>{form.customer_taxcode}</td>
                                <td>{form.customer_area}</td>
                                <td>{form.customer_address}</td>
                                <td>
                                    <a className="btn btn-warning btn-sm" href={`/khachhang/capnhat/${form.id}`} role="button">Cập nhật</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}