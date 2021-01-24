import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CustomerService from "../../services/customer.service"
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import "./style.css"

export default function CustomerList() {

    const [customerResult, setCustomerResult] = useState();
    const [total, setTotal] = useState(0);
    const [content, setContent] = useState("");
    const currentUser = AuthService.getCurrentUser();

    const FetchData = () => {
        const employee = currentUser.username.split('.')[0]
        CustomerService.get_customers(employee).then((response) => {
            setCustomerResult(response.data)
            setTotal(response.data.length)
        })
    }

    useEffect(() => {
        UserService.getModeratorBoard().then(
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

    useEffect(() => {
        if (content == "Moderator") {
            FetchData()
        }
    }, [content])


    return (
        <div className="custom">
            { content == "Moderator" ?
                <div className="card card-body">
                    <h5>DANH SÁCH KHÁCH HÀNG</h5>
                    <div className="row">
                        <div className="col-sm">
                            <h6>
                                Số khách hàng: {total}
                            </h6>
                        </div>
                        <div className="col-sm">
                            <h6>
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="emp"
                                    filename="Danh sách khách hàng"
                                    sheet="Sheet"
                                    buttonText="Export excel"
                                />
                            </h6>
                        </div>
                    </div>
                    <div className="table-container">
                        <table id="emp" className="table">
                            <tbody >
                                <tr key="a">
                                    <th>STT</th>
                                    <th>User</th>
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
                                {!!customerResult && customerResult.map((form, index) => (
                                    <tr className="content" key={form.id}>
                                        <td>{index + 1}</td>
                                        <td>{form.employee}</td>
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
                                            <a className="btn btn-warning btn-sm" href={`/dashboard/customers/update/${form.id}`} role="button">Cập nhật</a>
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