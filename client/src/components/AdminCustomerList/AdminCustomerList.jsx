import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CustomerService from "../../services/customer.service"
import UserService from "../../services/user.service";
import useFullPageLoader from "../../services/loader.service"
import "./style.css"

export default function AdminCustomerList() {

    const [customerResult, setCustomerResult] = useState();
    const [total, setTotal] = useState(0);
    const [content, setContent] = useState("");
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [branch, setBranch] = useState("");
    const [flag, setFlag] = useState(0);

    const FetchAllData = () => {
        showLoader()
        CustomerService.get_customers("").then((response) => {
            hideLoader()
            setCustomerResult(response.data)
            setTotal(response.data.length)
        })
    }

    const onChangeBranch = (e) => {
        const branch = e.target.value;
        setBranch(branch);
        CustomerService.get_customers(branch).then((response) => {
            setCustomerResult(response.data)
            setTotal(response.data.length)
        })
    }

    const OnClickSearchTool = () => {
        if (flag === 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
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
        <>
            {loader}
            {content === "Admin" ?
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
                                <button type="button" className="btn btn-success" style={{ marginLeft: "5px" }} onClick={OnClickSearchTool}>
                                    Tìm kiếm nâng cao
                                                </button>
                            </div>
                        </div>
                    </div>
                    {flag === 1 ?
                        <div>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row">
                                        <label className="col-lg-4" >Chi nhánh</label>
                                        <select className="form-control col-sm" name="branch" id="branch" onChange={onChangeBranch}>
                                            <option value="">Total</option>
                                            <option value="NVL">NVL</option>
                                            <option value="PDA">PDA</option>
                                            <option value="DONGNAI">DONGNAI</option>
                                            <option value="QUANGTRI">QUANGTRI</option>
                                            <option value="DANANG">DANANG</option>
                                            <option value="VUNGTAU">VUNGTAU</option>
                                            <option value="GIALAI">GIALAI</option>
                                            <option value="TAYNINH">TAYNINH</option>
                                            <option value="DAKLAK">DAKLAK</option>
                                            <option value="LAMDONG">LAMDONG</option>
                                            <option value="CANTHO">CANTHO</option>
                                            <option value="BINHPHUOC">BINHPHUOC</option>
                                            <option value="HUNGYEN">HUNGYEN</option>
                                            <option value="BINHDINH">BINHDINH</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">

                                </div>
                            </div>
                        </div>
                        :
                        <div></div>
                    }
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
                :
                <div>{content}</div>
            }
        </>
    )
}