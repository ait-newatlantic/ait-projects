import React, { useEffect, useState } from 'react'
import api from "../../api/index"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "./style.css"

export default function DSKH() {
    
    const [customerResult, setCustomerResult] = useState();

    useEffect(() => {
        api.get("/api/customers").then((response) => {
            setCustomerResult(response.data)
        })
    }, [])

    return (
        <div>
            <div className="container-fluid p-3 my-3 border border-dark custom">
                <h1>DANH SÁCH KHÁCH HÀNG</h1>
                <div>
                    <ReactHTMLTableToExcel
                        className="btn btn-info"
                        table="emp"
                        filename="Báo cáo kinh doanh"
                        sheet="Sheet"
                        buttonText="Export excel" />
                </div>
                <div className="table-container">
                <table className="table-sm">
                    <tbody >
                        <tr key="a">
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
                            <tr className="content" key={form.id}>
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
                                    <a className="btn btn-warning btn-sm" href={`/customers/capnhat/${form.id}`} role="button">Cập nhật</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}