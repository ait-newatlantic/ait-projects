import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import "./style.css"
import DemandService from "../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CarChart from "../CarChart/CarChart"
import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import SearchIcon from '@material-ui/icons/Search';

export default function DemandDetailReport() {

    const [fromdate, setFromDate] = useState('2020-01-01');
    const [todate, setToDate] = useState('2030-01-01');
    const [datetype, setDateType] = useState('');
    const [yearResult, setYearResult] = useState();
    const [yearResult3, setYearResult3] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const currentUser = AuthService.getCurrentUser();
    const [branch, setBranch] = useState("");
    const [content, setContent] = useState("");
    const [total, setTotal] = useState(0);

    const getDate_Specific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_date_specific(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getUpdatedAt_Specific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_updateAt_specific(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getCreatedAt_Specific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_createAt_specific(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getGoAt_Specific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_goAt_specific(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const Submit = () => {
        if (datetype === "Ngày tạo form") {
            getCreatedAt_Specific()
        }
        else if (datetype === "Ngày cập nhật gần nhất") {
            getUpdatedAt_Specific()
        }
        else if (datetype === "Ngày đi thực tế") {
            getGoAt_Specific()
        }
        else {
            getDate_Specific()
        }
    }

    const onChangeDateType = (e) => {
        const datetype = e.target.value;
        setDateType(datetype);
    };

    const onChangeFromDate = (e) => {
        const fromdate = e.target.value;
        setFromDate(fromdate);
    };

    const onChangeToDate = (e) => {
        const todate = e.target.value;
        setToDate(todate);
    };

    const FetchDemandSpecific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_demands_specific(employee).then((response) => {
            setYearResult(response.data)
            setTotal(response.data.length)
        })
    }

    const FetchDemandQuantitySpecific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_all_quantity_specific(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult3(response.data)
        })
    }

    useEffect(() => {
        FetchDemandSpecific()
        FetchDemandQuantitySpecific()

    }, [])

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


    return (
        <>
        <div className="custom">
            {content == "Trưởng Chi Nhánh" ?
                <div>
                    <div className="card-deck">
                        <div className="card">
                            <h5><SearchIcon /></h5>
                            <div>
                                <label htmlFor="exampleFormControlSelect1">Loại ngày</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeDateType}>
                                    <option defaultValue="">Click để chọn</option>
                                    <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                    <option defaultValue="Ngày cập nhật gần nhất">Ngày cập nhật gần nhất</option>
                                    <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                    <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                </select>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                                    <input type="date" className="form-control"
                                        id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                </div>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                                    <input type="date" className="form-control"
                                        id="exampleFormControlInput1" onChange={onChangeToDate} />
                                </div>
                            </div>
                            <div>
                                <Button block type="submit" onClick={Submit}>
                                    Tra cứu
                    </Button>
                            </div>
                        </div>
                        <div className="card">
                            <h5>BIỂU ĐỒ ĐÁNH GIÁ SỐ LƯỢNG XE ĐÃ BÁN</h5>
                            {!!yearResult3 && yearResult3.map(quantity => (
                                <CarChart key="a"
                                    c6540={quantity.c6540}
                                    c6460={quantity.c6460}
                                    c43253={quantity.c43253}
                                    c43265={quantity.c43265}
                                    c43266={quantity.c43266}
                                    c53228={quantity.c53228}
                                    c53229={quantity.c53229}
                                    c65115={quantity.c65115}
                                    c65116={quantity.c65116}
                                    c65117={quantity.c65117}
                                    c57={quantity.c57}
                                />
                            ))}
                        </div>
                    </div>
                    <br />
                    <div className="card">
                        <h5>BÁO CÁO KINH DOANH CHI TIẾT</h5>
                        <h6>Tổng số lượng records: {total}</h6>
                        <h6>
                            <ReactHTMLTableToExcel
                                className="btn btn-info"
                                table="emp"
                                filename="Báo cáo kinh doanh"
                                sheet="Sheet"
                                buttonText="Export excel" />
                        </h6>
                        <div className="table-container">
                            <table id="emp" className="table-lg" >
                                <thead>
                                    <tr id="titles" key="a">
                                        <th rowSpan="1">STT</th>
                                        <th colSpan="1">Tên chi nhánh</th>
                                        <th colSpan="1">Thông tin nhân viên</th>
                                        <th colSpan="7">Thông tin khách hàng</th>
                                        <th colSpan="4">Thông tin xe</th>
                                        <th colSpan="4">Thông tin thêm</th>
                                        <th colSpan="1">Chức năng</th>
                                    </tr>
                                    <tr>
                                        <th>#</th>
                                        <th>Chi nhánh</th>
                                        <th>Người đi thực tế</th>
                                        <th>Tên khách hàng</th>
                                        <th>Số điện thoại khách hàng</th>
                                        <th>Loại khách hàng</th>
                                        <th>Khách hàng thuộc khu vực</th>
                                        <th>Ý kiến khách hàng</th>
                                        <th>Phương thức liên lạc</th>
                                        <th>Giai đoạn</th>
                                        <th>Model xe</th>
                                        <th>Loại xe</th>
                                        <th>Số lượng</th>
                                        <th>Màu xe</th>
                                        <th>Ngày đi thực tế</th>
                                        <th>Ngày tạo form</th>
                                        <th>Ngày cập nhật gần nhất</th>
                                        <th>Ghi chú</th>
                                        <th>Cập nhật</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {!!yearResult && yearResult.map((form, index) => (
                                        <tr className="content" key={form.id}>
                                            <td>{index + 1}</td>
                                            <td>{form.employee.split('.')[0]}</td>
                                            <td>{form.employee_field}</td>
                                            <td>{form.customer}</td>
                                            <td>{form.customer_number}</td>
                                            <td>{form.customer_type}</td>
                                            <td>{form.customer_area}</td>
                                            <td>{form.customer_opinion}</td>
                                            <td>{form.customer_communication}</td>
                                            <td>{form.status}</td>
                                            <td>{form.model}</td>
                                            <td>{form.type}</td>
                                            <td>{form.quantity}</td>
                                            <td>{form.color}</td>
                                            <td>{form.date}</td>
                                            <td>{form.createdAt.substring(0, 10)}</td>
                                            <td>{form.updatedAt.substring(0, 10)}</td>
                                            <td>{form.note}</td>
                                            <td>
                                                <a className="btn btn-warning btn-sm" href={`/demands/update/${form.id}`} role="button">Cập nhật</a>
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
        </div>
        {loader}
    </>
    )
}