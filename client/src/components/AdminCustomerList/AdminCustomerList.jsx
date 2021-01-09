import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CustomerService from "../../services/customer.service"
import UserService from "../../services/user.service";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import "./style.css"

export default function AdminCustomerList() {

    const [customerResult, setCustomerResult] = useState();
    const [total, setTotal] = useState(0);
    const [content, setContent] = useState("");

    const FetchAllData = () => {
        CustomerService.get_customers().then((response) => {
            setCustomerResult(response.data)
            setTotal(response.data.length)
        })
    }

    useEffect(() => {
        FetchAllData()
    }, [])

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="custom">
            { content == "Admin" ?
                <div className="card card-body">
                    <h5>DANH SÁCH KHÁCH HÀNG</h5>
                    <h6>Số khách hàng: {total}</h6>
                    <h6>
                        <ReactHTMLTableToExcel
                            className="btn btn-info"
                            table="emp"
                            filename="Danh sách khách hàng"
                            sheet="Sheet"
                            buttonText="Export excel"
                        />
                    </h6>
                    <div className="table-container">
                        <table id="emp" className="table">
                            <thead>
                                <tr key="a">
                                    <th>#</th>
                                    <th>Chi nhánh</th>
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
                            </thead>
                            <tbody >
                                {!!customerResult && customerResult.map((form, index) => (
                                    <tr className="content" key={form.id}>
                                        <td>{index + 1}</td>
                                        <td>{form.employee.split('.')[0]}</td>
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
                                            <a className="btn btn-warning btn-sm" href={`/customers/update/${form.id}`} role="button">Cập nhật</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div>{content}</div>
            }
        </div>
    )
}