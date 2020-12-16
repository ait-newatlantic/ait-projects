import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CustomerService from "../../services/customer.service"
import AuthService from "../../services/auth.service";
import "./style.css"

export default function DSKH() {

    const [customerResult, setCustomerResult] = useState();
    const [total, setTotal] = useState(0);
    const currentUser = AuthService.getCurrentUser();

    const FetchAllData = () => {
        CustomerService.get_customers().then((response) => {
            setCustomerResult(response.data)
            setTotal(response.data[response.data.length-1].id)
        })
    }

    const FetchSpecificData = () => {
        const employee = currentUser.username.split('.')[0]
        CustomerService.get_specific_customers(employee).then((response) => {
            setCustomerResult(response.data)
        })
    }

    useEffect(() => {
        if (currentUser.username.split('.')[0] === "AIT") {
            FetchAllData()
        } else {
            FetchSpecificData()
        }
    }, [])

    return (
        <div className="custom">
            <div className="card card-body">
                <h1>DANH SÁCH KHÁCH HÀNG</h1>
                <h6>Số khách hàng: {total}</h6>
                <div>
                    <ReactHTMLTableToExcel
                        className="btn btn-info"
                        table="emp"
                        filename="Danh sách khách hàng"
                        sheet="Sheet"
                        buttonText="Export excel" />
                </div>
                <div className="table-container">
                    <table id="emp" className="table">
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