import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CustomerService from "../../services/customer.service"
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import useFullPageLoader from "../../services/loader.service"
import "./style.css"

export default function CustomerList() {

    const [customerResult, setCustomerResult] = useState();
    const [total, setTotal] = useState(0);
    const [content, setContent] = useState("");
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const currentUser = AuthService.getCurrentUser();

    const FetchData = () => {
        showLoader()
        const employee = currentUser.username.split('.')[0]
        CustomerService.get_customers(employee).then((response) => {
            hideLoader()
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
        <>
        {loader}
        {content == "Moderator" ?
            <div className="custom">
                <div className="card pt-3">
                    <div className="card-header text-white" style={{ backgroundColor: "#24305E" }}>
                        <div className="row">
                            <div className="col-sm">
                                DANH SÁCH KHÁCH HÀNG (TỔNG KHÁCH HÀNG: {total})
                                </div>
                            <div className="col-sm text-right">
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="emp"
                                    filename="Danh sách khách hàng"
                                    sheet="Sheet"
                                    buttonText="Export excel"
                                />
                                {/* <button type="button" className="btn btn-success" style={{ marginLeft: "5px" }} onClick={OnClickSearchTool}>
                                    Tìm kiếm nâng cao
                                            </button> */}
                            </div>
                        </div>
                    </div>
                    <div className="table-container">
                        <table id="emp" className="table-lg">
                            <thead>
                                <tr id="titles" key="a">
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
                                            <a className="btn btn-warning btn-sm" href={`/dashboard/customers/update/${form.id}`} role="button">Cập nhật</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            :
            <div>{content}</div>
        }
    </>
    )
}