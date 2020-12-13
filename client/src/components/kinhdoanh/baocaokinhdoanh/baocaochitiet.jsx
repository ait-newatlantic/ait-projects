import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import "./style.css"
import DemandService from "../../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import StackChart from "../../chart/stack"
import VerticalChart from "../../chart/vertical"
import AuthService from "../../../services/auth.service";
import useFullPageLoader from "../../../services/loader.service"

export default function BCCT() {

    const [fromdate, setFromDate] = useState('2020-01-01');
    const [todate, setToDate] = useState('2030-01-01');
    const [datetype, setDateType] = useState('');
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();
    const [yearResult3, setYearResult3] = useState();
    //const [user, setUser] = useState('');
    // const [updateats, setUpdateAt] = useState([])
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUsers, setCurrentUsers] = useState(undefined);
    const currentUser = AuthService.getCurrentUser();

    const getDate = () => {
        DemandService.get_date(fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getUpdatedAt = () => {
        showLoader()
        DemandService.get_updateAt(fromdate, todate).then((response) => {
            hideLoader()
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getCreatedAt = () => {
        DemandService.get_createAt(fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getGoAt = () => {
        DemandService.get_goAt(fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

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
        if (currentUser.username.split('.')[0] === "AIT") {
            if (datetype === "Ngày tạo form") {
                getCreatedAt()
                FetchDemandModels()
                FetchDemandQuantity()
            }
            else if (datetype === "Ngày cập nhật gần nhất") {
                getUpdatedAt()
                FetchDemandModels()
                FetchDemandQuantity()
            }
            else if (datetype === "Ngày đi thực tế") {
                getGoAt()
                FetchDemandModels()
                FetchDemandQuantity()
            }
            else {
                getDate()
                FetchDemandModels()
                FetchDemandQuantity()
            }
        } else {
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

    const FetchDemand = () => {
        DemandService.get_demands().then((response) => {
            setYearResult(response.data)
        })
    }

    const FetchDemandModels = () => {
        showLoader()
        DemandService.get_all_models(
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult2(response.data)
        })
    }

    const FetchDemandQuantity = () => {
        showLoader()
        DemandService.get_all_quantity(
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult3(response.data)
        })
    }

    const FetchDemandSpecific = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_demands_specific(employee).then((response) => {
            setYearResult(response.data)
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
        console.log(currentUser.username.split('.')[0])
        if (currentUser.username.split('.')[0] === "AIT") {
            FetchDemand()
            FetchDemandModels()
            FetchDemandQuantity()
        } else {
            FetchDemandSpecific()
            FetchDemandQuantitySpecific()
        }
    }, [])

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUsers(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    return (
        <div>
            {showAdminBoard && (
                <>
                    <div>
                        <div className="container-fluid p-3 my-3 border border-dark custom">
                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="exampleFormControlSelect1">Loại ngày</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeDateType}>
                                        <option defaultValue="">Click để chọn</option>
                                        <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                        <option defaultValue="Ngày cập nhật gần nhất">Ngày cập nhật gần nhất</option>
                                        <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                        <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                    </select>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                                        <input type="date" className="form-control"
                                            id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                                        <input type="date" className="form-control"
                                            id="exampleFormControlInput1" onChange={onChangeToDate} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <Button block type="submit" onClick={Submit}>
                                        Tra cứu
                        </Button>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid p-3 my-3 border border-dark custom">
                            <div className="row">
                                <h1>BÁO CÁO KINH DOANH CHI TIẾT</h1>
                            </div>
                            <div className="row">
                                <div>
                                    <ReactHTMLTableToExcel
                                        className="btn btn-info"
                                        table="emp"
                                        filename="Báo cáo kinh doanh"
                                        sheet="Sheet"
                                        buttonText="Export excel" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="table-container">
                                    <table id="emp" className="table-lg" >
                                        <tbody >
                                            <tr id="titles" key="a">
                                                <th colSpan="2">Thông tin nhân viên</th>
                                                <th colSpan="7">Thông tin khách hàng</th>
                                                <th colSpan="4">Thông tin xe</th>
                                                <th colSpan="4">Thông tin thêm</th>
                                                <th rowSpan="2">Cập nhật</th>
                                            </tr>
                                            <tr>
                                                <th>Người nhập</th>
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
                                            </tr>
                                            {!!yearResult && yearResult.map(form => (
                                                <tr className="content" key={form.id}>
                                                    <td>{form.employee}</td>
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
                                                        <a className="btn btn-warning btn-sm" href={`/kinhdoanh/capnhat/demands/${form.id}`} role="button">Cập nhật</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid p-3 my-3 border border-dark custom">
                            {/* <h1>BÁO CÁO TÌNH HÌNH KINH DOANH CHI NHÁNH (thực tế_dự kiến)</h1> */}
                            <div>
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="emp1"
                                    filename="Báo cáo tình hình kinh doanh từng chi nhánh"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                            </div>
                            <div className="table-container">
                                <table id="emp1" className="table-sm">
                                    <tbody >
                                        <tr id="titles" key="a">
                                            <th>Chi nhánh</th>
                                            <th>6540</th>
                                            <th>6460</th>
                                            <th>43253</th>
                                            <th>43265</th>
                                            <th>43266</th>
                                            <th>53228</th>
                                            <th>53299</th>
                                            <th>65115</th>
                                            <th>65116</th>
                                            <th>65117</th>
                                            <th>Cẩu 5-7 tấn</th>
                                            <th>Tổng cộng</th>
                                            <th>Hiệu suất kinh doanh (%)</th>
                                            <th>Tỉ trọng trên tổng số lượng xe (%)</th>
                                        </tr>
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Nguyễn Văn Linh</td>
                                                <td>{model.nvl_6540}_{model.nvl_6540_total}</td>
                                                <td>{model.nvl_6460}_{model.nvl_6460_total}</td>
                                                <td>{model.nvl_43253}_{model.nvl_43253_total}</td>
                                                <td>{model.nvl_43265}_{model.nvl_43265_total}</td>
                                                <td>{model.nvl_43266}_{model.nvl_43266_total}</td>
                                                <td>{model.nvl_53228}_{model.nvl_53228_total}</td>
                                                <td>{model.nvl_53229}_{model.nvl_53229_total}</td>
                                                <td>{model.nvl_65115}_{model.nvl_65115_total}</td>
                                                <td>{model.nvl_65116}_{model.nvl_65116_total}</td>
                                                <td>{model.nvl_65117}_{model.nvl_65117_total}</td>
                                                <td>{model.nvl_c57}_{model.nvl_c57_total}</td>
                                                <td>{model.nvl_total_s}_{model.nvl_total}</td>
                                                <td>{Math.round(model.nvl_total_s / model.nvl_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.nvl_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Lâm Đồng</td>
                                                <td>{model.lamdong_6540}_{model.lamdong_6540_total}</td>
                                                <td>{model.lamdong_6460}_{model.lamdong_6460_total}</td>
                                                <td>{model.lamdong_43253}_{model.lamdong_43253_total}</td>
                                                <td>{model.lamdong_43265}_{model.lamdong_43265_total}</td>
                                                <td>{model.lamdong_43266}_{model.lamdong_43266_total}</td>
                                                <td>{model.lamdong_53228}_{model.lamdong_53228_total}</td>
                                                <td>{model.lamdong_53229}_{model.lamdong_53229_total}</td>
                                                <td>{model.lamdong_65115}_{model.lamdong_65115_total}</td>
                                                <td>{model.lamdong_65116}_{model.lamdong_65116_total}</td>
                                                <td>{model.lamdong_65117}_{model.lamdong_65117_total}</td>
                                                <td>{model.lamdong_c57}_{model.lamdong_c57_total}</td>
                                                <td>{model.lamdong_total_s}_{model.lamdong_total}</td>
                                                <td>{Math.round(model.lamdong_total_s / model.lamdong_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.lamdong_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Vũng Tàu</td>
                                                <td>{model.vungtau_6540}_{model.vungtau_6540_total}</td>
                                                <td>{model.vungtau_6460}_{model.vungtau_6460_total}</td>
                                                <td>{model.vungtau_43253}_{model.vungtau_43253_total}</td>
                                                <td>{model.vungtau_43265}_{model.vungtau_43265_total}</td>
                                                <td>{model.vungtau_43266}_{model.vungtau_43266_total}</td>
                                                <td>{model.vungtau_53228}_{model.vungtau_53228_total}</td>
                                                <td>{model.vungtau_53229}_{model.vungtau_53229_total}</td>
                                                <td>{model.vungtau_65115}_{model.vungtau_65115_total}</td>
                                                <td>{model.vungtau_65116}_{model.vungtau_65116_total}</td>
                                                <td>{model.vungtau_65117}_{model.vungtau_65117_total}</td>
                                                <td>{model.vungtau_c57}_{model.vungtau_c57_total}</td>
                                                <td>{model.vungtau_total_s}_{model.vungtau_total}</td>
                                                <td>{Math.round(model.vungtau_total_s / model.vungtau_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.vungtau_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Bình Phước</td>
                                                <td>{model.binhphuoc_6540}_{model.binhphuoc_6540_total}</td>
                                                <td>{model.binhphuoc_6460}_{model.binhphuoc_6460_total}</td>
                                                <td>{model.binhphuoc_43253}_{model.binhphuoc_43253_total}</td>
                                                <td>{model.binhphuoc_43265}_{model.binhphuoc_43265_total}</td>
                                                <td>{model.binhphuoc_43266}_{model.binhphuoc_43266_total}</td>
                                                <td>{model.binhphuoc_53228}_{model.binhphuoc_53228_total}</td>
                                                <td>{model.binhphuoc_53229}_{model.binhphuoc_53229_total}</td>
                                                <td>{model.binhphuoc_65115}_{model.binhphuoc_65115_total}</td>
                                                <td>{model.binhphuoc_65116}_{model.binhphuoc_65116_total}</td>
                                                <td>{model.binhphuoc_65117}_{model.binhphuoc_65117_total}</td>
                                                <td>{model.binhphuoc_c57}_{model.binhphuoc_c_57_total}</td>
                                                <td>{model.binhduong_total_s}_{model.binhduong_total}</td>
                                                <td>{Math.round(model.binhduong_total_s / model.binhduong_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.binhduong_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Gia Lai</td>
                                                <td>{model.gialai_6540}_{model.gialai_6540_total}</td>
                                                <td>{model.gialai_6460}_{model.gialai_6460_total}</td>
                                                <td>{model.gialai_43253}_{model.gialai_43253_total}</td>
                                                <td>{model.gialai_43265}_{model.gialai_43265_total}</td>
                                                <td>{model.gialai_43266}_{model.gialai_43266_total}</td>
                                                <td>{model.gialai_53228}_{model.gialai_53228_total}</td>
                                                <td>{model.gialai_53229}_{model.gialai_53229_total}</td>
                                                <td>{model.gialai_65115}_{model.gialai_65115_total}</td>
                                                <td>{model.gialai_65116}_{model.gialai_65116_total}</td>
                                                <td>{model.gialai_65117}_{model.gialai_65117_total}</td>
                                                <td>{model.gialai_c57}_{model.gialai_c57_total}</td>
                                                <td>{model.gialai_total_s}_{model.gialai_total}</td>
                                                <td>{Math.round(model.gialai_total_s / model.gialai_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.gialai_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Cần Thơ</td>
                                                <td>{model.cantho_6540}_{model.cantho_6540_total}</td>
                                                <td>{model.cantho_6460}_{model.cantho_6460_total}</td>
                                                <td>{model.cantho_43253}_{model.cantho_43253_total}</td>
                                                <td>{model.cantho_43265}_{model.cantho_43265_total}</td>
                                                <td>{model.cantho_43266}_{model.cantho_43266_total}</td>
                                                <td>{model.cantho_53228}_{model.cantho_53228_total}</td>
                                                <td>{model.cantho_53229}_{model.cantho_53229_total}</td>
                                                <td>{model.cantho_65115}_{model.cantho_65115_total}</td>
                                                <td>{model.cantho_65116}_{model.cantho_65116_total}</td>
                                                <td>{model.cantho_65117}_{model.cantho_65117_total}</td>
                                                <td>{model.cantho_c57}_{model.cantho_c57_total}</td>
                                                <td>{model.cantho_total_s}_{model.cantho_total}</td>
                                                <td>{Math.round(model.cantho_total_s / model.cantho_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.cantho_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Đăk Lăk</td>
                                                <td>{model.daklak_6540}_{model.daklak_6540_total}</td>
                                                <td>{model.daklak_6460}_{model.daklak_6460_total}</td>
                                                <td>{model.daklak_43253}_{model.daklak_43253_total}</td>
                                                <td>{model.daklak_43265}_{model.daklak_43265_total}</td>
                                                <td>{model.daklak_43266}_{model.daklak_43266_total}</td>
                                                <td>{model.daklak_53228}_{model.daklak_53228_total}</td>
                                                <td>{model.daklak_53229}_{model.daklak_53229_total}</td>
                                                <td>{model.daklak_65115}_{model.daklak_65115_total}</td>
                                                <td>{model.daklak_65116}_{model.daklak_65116_total}</td>
                                                <td>{model.daklak_65117}_{model.daklak_65117_total}</td>
                                                <td>{model.daklak_c57}_{model.daklak_c57_total}</td>
                                                <td>{model.daklak_total_s}_{model.daklak_total}</td>
                                                <td>{Math.round(model.daklak_total_s / model.daklak_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.daklak_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Đà Nẵng</td>
                                                <td>{model.danang_6540}_{model.danang_6540_total}</td>
                                                <td>{model.danang_6460}_{model.danang_6460_total}</td>
                                                <td>{model.danang_43253}_{model.danang_43253_total}</td>
                                                <td>{model.danang_43265}_{model.danang_43265_total}</td>
                                                <td>{model.danang_43266}_{model.danang_43266_total}</td>
                                                <td>{model.danang_53228}_{model.danang_53228_total}</td>
                                                <td>{model.danang_53229}_{model.danang_53229_total}</td>
                                                <td>{model.danang_65115}_{model.danang_65115_total}</td>
                                                <td>{model.danang_65116}_{model.danang_65116_total}</td>
                                                <td>{model.danang_65117}_{model.danang_65117_total}</td>
                                                <td>{model.danang_c57}_{model.danang_c57_total}</td>
                                                <td>{model.danang_total_s}_{model.danang_total}</td>
                                                <td>{Math.round(model.danang_total_s / model.danang_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.danang_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Quảng Trị</td>
                                                <td>{model.quangtri_6540}_{model.quangtri_6540_total}</td>
                                                <td>{model.quangtri_6460}_{model.quangtri_6460_total}</td>
                                                <td>{model.quangtri_43253}_{model.quangtri_43253_total}</td>
                                                <td>{model.quangtri_43265}_{model.quangtri_43265_total}</td>
                                                <td>{model.quangtri_43266}_{model.quangtri_43266_total}</td>
                                                <td>{model.quangtri_53228}_{model.quangtri_53228_total}</td>
                                                <td>{model.quangtri_53229}_{model.quangtri_53229_total}</td>
                                                <td>{model.quangtri_65115}_{model.quangtri_65115_total}</td>
                                                <td>{model.quangtri_65116}_{model.quangtri_65116_total}</td>
                                                <td>{model.quangtri_65117}_{model.quangtri_65117_total}</td>
                                                <td>{model.quangtri_c57}_{model.quangtri_c57_total}</td>
                                                <td>{model.quangtri_total_s}_{model.quangtri_total}</td>
                                                <td>{Math.round(model.quangtri_total_s / model.quangtri_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.quangtri_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Hưng Yên</td>
                                                <td>{model.hungyen_6540}_{model.hungyen_6540_total}</td>
                                                <td>{model.hungyen_6460}_{model.hungyen_6460_total}</td>
                                                <td>{model.hungyen_43253}_{model.hungyen_43253_total}</td>
                                                <td>{model.hungyen_43265}_{model.hungyen_43265_total}</td>
                                                <td>{model.hungyen_43266}_{model.hungyen_43266_total}</td>
                                                <td>{model.hungyen_53228}_{model.hungyen_53228_total}</td>
                                                <td>{model.hungyen_53229}_{model.hungyen_53229_total}</td>
                                                <td>{model.hungyen_65115}_{model.hungyen_65115_total}</td>
                                                <td>{model.hungyen_65116}_{model.hungyen_65116_total}</td>
                                                <td>{model.hungyen_65117}_{model.hungyen_65117_total}</td>
                                                <td>{model.hungyen_c57}_{model.hungyen_c57_total}</td>
                                                <td>{model.hungyen_total_s}_{model.hungyen_total}</td>
                                                <td>{Math.round(model.hungyen_total_s / model.hungyen_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.hungyen_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Bình Định</td>
                                                <td>{model.binhdinh_6540}_{model.binhdinh_6540_total}</td>
                                                <td>{model.binhdinh_6460}_{model.binhdinh_6460_total}</td>
                                                <td>{model.binhdinh_43253}_{model.binhdinh_43253_total}</td>
                                                <td>{model.binhdinh_43265}_{model.binhdinh_43265_total}</td>
                                                <td>{model.binhdinh_43266}_{model.binhdinh_43266_total}</td>
                                                <td>{model.binhdinh_53228}_{model.binhdinh_53228_total}</td>
                                                <td>{model.binhdinh_53229}_{model.binhdinh_53229_total}</td>
                                                <td>{model.binhdinh_65115}_{model.binhdinh_65115_total}</td>
                                                <td>{model.binhdinh_65116}_{model.binhdinh_65116_total}</td>
                                                <td>{model.binhdinh_65117}_{model.binhdinh_65117_total}</td>
                                                <td>{model.binhdinh_c57}_{model.binhdinh_c57_total}</td>
                                                <td>{model.binhdinh_total_s}_{model.binhdinh_total}</td>
                                                <td>{Math.round(model.binhdinh_total_s / model.binhdinh_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.binhdinh_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Bình Dương</td>
                                                <td>{model.binhduong_6540}_{model.binhduong_6540_total}</td>
                                                <td>{model.binhduong_6460}_{model.binhduong_6460_total}</td>
                                                <td>{model.binhduong_43253}_{model.binhduong_43253_total}</td>
                                                <td>{model.binhduong_43265}_{model.binhduong_43265_total}</td>
                                                <td>{model.binhduong_43266}_{model.binhduong_43266_total}</td>
                                                <td>{model.binhduong_53228}_{model.binhduong_53228_total}</td>
                                                <td>{model.binhduong_53229}_{model.binhduong_53229_total}</td>
                                                <td>{model.binhduong_65115}_{model.binhduong_65115_total}</td>
                                                <td>{model.binhduong_65116}_{model.binhduong_65116_total}</td>
                                                <td>{model.binhduong_65117}_{model.binhduong_65117_total}</td>
                                                <td>{model.binhduong_c57}_{model.binhduong_c_57_total}</td>
                                                <td>{model.binhduong_total_s}_{model.binhduong_total}</td>
                                                <td>{Math.round(model.binhduong_total_s / model.binhduong_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.binhduong_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                        {!!yearResult2 && yearResult2.map(model => (
                                            <tr className="content" key={model.id}>
                                                <td>Đồng Nai</td>
                                                <td>{model.dongnai_6540}_{model.dongnai_6540_total}</td>
                                                <td>{model.dongnai_6460}_{model.dongnai_6460_total}</td>
                                                <td>{model.dongnai_43253}_{model.dongnai_43253_total}</td>
                                                <td>{model.dongnai_43265}_{model.dongnai_43265_total}</td>
                                                <td>{model.dongnai_43266}_{model.dongnai_43266_total}</td>
                                                <td>{model.dongnai_53228}_{model.dongnai_53228_total}</td>
                                                <td>{model.dongnai_53229}_{model.dongnai_53229_total}</td>
                                                <td>{model.dongnai_65115}_{model.dongnai_65115_total}</td>
                                                <td>{model.dongnai_65116}_{model.dongnai_65116_total}</td>
                                                <td>{model.dongnai_65117}_{model.dongnai_65117_total}</td>
                                                <td>{model.dongnai_c57}_{model.dongnai_c57_total}</td>
                                                <td>{model.dongnai_total_s}_{model.dongnai_total}</td>
                                                <td>{Math.round(model.dongnai_total_s / model.dongnai_total * 10000) / 100}%</td>
                                                <td>{Math.round(parseInt(model.dongnai_total_s) / parseInt(model.total) * 10000) / 100}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="container-fluid p-3 my-3 border border-dark custom">
                            {/* <h1>BIỂU ĐỒ KINH DOANH CHI TIẾT</h1> */}
                            <div className="row">
                                <div className="col-sm">
                                    <h4>BIỂU ĐỒ ĐÁNH GIÁ KINH DOANH TỪNG CHI NHÁNH</h4>
                                    {!!yearResult2 && yearResult2.map(model => (
                                        <StackChart key="a"
                                            nvl_6540={model.nvl_6540}
                                            vungtau_6540={model.vungtau_6540}
                                            daklak_6540={model.daklak_6540}
                                            lamdong_6540={model.lamdong_6540}
                                            dongnai_6540={model.dongnai_6540}
                                            gialai_6540={model.gialai_6540}
                                            binhphuoc_6540={model.binhphuoc_6540}
                                            cantho_6540={model.cantho_6540}
                                            danang_6540={model.danang_6540}
                                            quangtri_6540={model.quangtri_6540}
                                            hungyen_6540={model.hungyen_6540}
                                            binhduong_6540={model.binhduong_6540}
                                            binhdinh_6540={model.binhdinh_6540}

                                            nvl_6460={model.nvl_6460}
                                            vungtau_6460={model.vungtau_6460}
                                            daklak_6460={model.daklak_6460}
                                            lamdong_6460={model.lamdong_6460}
                                            dongnai_6460={model.dongnai_6460}
                                            gialai_6460={model.gialai_6460}
                                            binhphuoc_6460={model.binhphuoc_6460}
                                            cantho_6460={model.cantho_6460}
                                            danang_6460={model.danang_6460}
                                            quangtri_6460={model.quangtri_6460}
                                            hungyen_6460={model.hungyen_6460}
                                            binhduong_6460={model.binhduong_6460}
                                            binhdinh_6460={model.binhdinh_6460}

                                            nvl_43253={model.nvl_43253}
                                            vungtau_43253={model.vungtau_43253}
                                            daklak_43253={model.daklak_43253}
                                            lamdong_43253={model.lamdong_43253}
                                            dongnai_43253={model.dongnai_43253}
                                            gialai_43253={model.gialai_43253}
                                            binhphuoc_43253={model.binhphuoc_43253}
                                            cantho_43253={model.cantho_43253}
                                            danang_43253={model.danang_43253}
                                            quangtri_43253={model.quangtri_43253}
                                            hungyen_43253={model.hungyen_43253}
                                            binhduong_43253={model.binhduong_43253}
                                            binhdinh_43253={model.binhdinh_43253}

                                            nvl_43265={model.nvl_43265}
                                            vungtau_43265={model.vungtau_43265}
                                            daklak_43265={model.daklak_43265}
                                            lamdong_43265={model.lamdong_43265}
                                            dongnai_43265={model.dongnai_43265}
                                            gialai_43265={model.gialai_43265}
                                            binhphuoc_43265={model.binhphuoc_43265}
                                            cantho_43265={model.cantho_43265}
                                            danang_43265={model.danang_43265}
                                            quangtri_43265={model.quangtri_43265}
                                            hungyen_43265={model.hungyen_43265}
                                            binhduong_43265={model.binhduong_43265}
                                            binhdinh_43265={model.binhdinh_43265}

                                            nvl_43266={model.nvl_43266}
                                            vungtau_43266={model.vungtau_43266}
                                            daklak_43266={model.daklak_43266}
                                            lamdong_43266={model.lamdong_43266}
                                            dongnai_43266={model.dongnai_43266}
                                            gialai_43266={model.gialai_43266}
                                            binhphuoc_43266={model.binhphuoc_43266}
                                            cantho_43266={model.cantho_43266}
                                            danang_43266={model.danang_43266}
                                            quangtri_43266={model.quangtri_43266}
                                            hungyen_43266={model.hungyen_43266}
                                            binhduong_43266={model.binhduong_43266}
                                            binhdinh_43266={model.binhdinh_43266}

                                            nvl_53228={model.nvl_53228}
                                            vungtau_53228={model.vungtau_53228}
                                            daklak_53228={model.daklak_53228}
                                            lamdong_53228={model.lamdong_53228}
                                            dongnai_53228={model.dongnai_53228}
                                            gialai_53228={model.gialai_53228}
                                            binhphuoc_53228={model.binhphuoc_53228}
                                            cantho_53228={model.cantho_53228}
                                            danang_53228={model.danang_53228}
                                            quangtri_53228={model.quangtri_53228}
                                            hungyen_53228={model.hungyen_53228}
                                            binhduong_53228={model.binhduong_53228}
                                            binhdinh_53228={model.binhdinh_53228}

                                            nvl_53229={model.nvl_53229}
                                            vungtau_53229={model.vungtau_53229}
                                            daklak_53229={model.daklak_53229}
                                            lamdong_53229={model.lamdong_53229}
                                            dongnai_53229={model.dongnai_53229}
                                            gialai_53229={model.gialai_53229}
                                            binhphuoc_53229={model.binhphuoc_53229}
                                            cantho_53229={model.cantho_53229}
                                            danang_53229={model.danang_53229}
                                            quangtri_53229={model.quangtri_53229}
                                            hungyen_53229={model.hungyen_53229}
                                            binhduong_53229={model.binhduong_53229}
                                            binhdinh_53229={model.binhdinh_53229}

                                            nvl_65115={model.nvl_65115}
                                            vungtau_65115={model.vungtau_65115}
                                            daklak_65115={model.daklak_65115}
                                            lamdong_65115={model.lamdong_65115}
                                            dongnai_65115={model.dongnai_65115}
                                            gialai_65115={model.gialai_65115}
                                            binhphuoc_65115={model.binhphuoc_65115}
                                            cantho_65115={model.cantho_65115}
                                            danang_65115={model.danang_65115}
                                            quangtri_65115={model.quangtri_65115}
                                            hungyen_65115={model.hungyen_65115}
                                            binhduong_65115={model.binhduong_65115}
                                            binhdinh_65115={model.binhdinh_65115}

                                            nvl_65116={model.nvl_65116}
                                            vungtau_65116={model.vungtau_65116}
                                            daklak_65116={model.daklak_65116}
                                            lamdong_65116={model.lamdong_65116}
                                            dongnai_65116={model.dongnai_65116}
                                            gialai_65116={model.gialai_65116}
                                            binhphuoc_65116={model.binhphuoc_65116}
                                            cantho_65116={model.cantho_65116}
                                            danang_65116={model.danang_65116}
                                            quangtri_65116={model.quangtri_65116}
                                            hungyen_65116={model.hungyen_65116}
                                            binhduong_65116={model.binhduong_65116}
                                            binhdinh_65116={model.binhdinh_65116}

                                            nvl_65117={model.nvl_65117}
                                            vungtau_65117={model.vungtau_65117}
                                            daklak_65117={model.daklak_65117}
                                            lamdong_65117={model.lamdong_65117}
                                            dongnai_65117={model.dongnai_65117}
                                            gialai_65117={model.gialai_65117}
                                            binhphuoc_65117={model.binhphuoc_65117}
                                            cantho_65117={model.cantho_65117}
                                            danang_65117={model.danang_65117}
                                            quangtri_65117={model.quangtri_65117}
                                            hungyen_65117={model.hungyen_65117}
                                            binhduong_65117={model.binhduong_65117}
                                            binhdinh_65117={model.binhdinh_65117}

                                            nvl_c57={model.nvl_c57}
                                            vungtau_c57={model.vungtau_c57}
                                            daklak_c57={model.daklak_c57}
                                            lamdong_c57={model.lamdong_c57}
                                            dongnai_c57={model.dongnai_c57}
                                            gialai_c57={model.gialai_c57}
                                            binhphuoc_c57={model.binhphuoc_c57}
                                            cantho_c57={model.cantho_c57}
                                            danang_c57={model.danang_c57}
                                            quangtri_c57={model.quangtri_c57}
                                            hungyen_c57={model.hungyen_c57}
                                            binhduong_c57={model.binhduong_c57}
                                            binhdinh_c57={model.binhdinh_c57}
                                        />

                                    ))}
                                </div>
                                <div className="col-sm">
                                    <h4>BIỂU ĐỒ ĐÁNH GIÁ SỐ LƯỢNG XE ĐÃ BÁN</h4>
                                    {!!yearResult3 && yearResult3.map(quantity => (
                                        <VerticalChart key="a"
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
                        </div>
                    </div>
                    {loader}
                </>
            )}
            {showModeratorBoard && (
                <>
                    <div className="row">
                        <div className="col-sm">
                            <div className="container-fluid p-3 my-3 border border-dark custom">
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="exampleFormControlSelect1">Loại ngày</label>
                                        <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeDateType}>
                                            <option defaultValue="">Click để chọn</option>
                                            <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                            <option defaultValue="Ngày cập nhật gần nhất">Ngày cập nhật gần nhất</option>
                                            <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                            <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                        </select>
                                    </div>
                                    <div className="col-sm">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                                            <input type="date" className="form-control"
                                                id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                                            <input type="date" className="form-control"
                                                id="exampleFormControlInput1" onChange={onChangeToDate} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <Button block type="submit" onClick={Submit}>
                                            Tra cứu
                         </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid p-3 my-3 border border-dark custom">
                                <h1>BÁO CÁO KINH DOANH CHI TIẾT</h1>
                                <div>
                                    <ReactHTMLTableToExcel
                                        className="btn btn-info"
                                        table="emp3"
                                        filename="Báo cáo kinh doanh"
                                        sheet="Sheet"
                                        buttonText="Export excel" />
                                </div>
                                <div className="table-container">
                                    <table id="emp3" className="table-lg">
                                        <tbody >
                                            <tr id="titles" key="a">
                                                <th colSpan="2">Thông tin nhân viên</th>
                                                <th colSpan="7">Thông tin khách hàng</th>
                                                <th colSpan="4">Thông tin xe</th>
                                                <th colSpan="4">Thông tin thêm</th>
                                                <th rowSpan="2">Cập nhật</th>
                                            </tr>
                                            <tr>
                                                <th>Người nhập</th>
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

                                            </tr>
                                            {!!yearResult && yearResult.map(form => (
                                                <tr className="content" key={form.id}>
                                                    <td>{form.employee}</td>
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
                                                        <a className="btn btn-warning btn-sm" href={`/kinhdoanh/capnhat/demands/${form.id}`} role="button">Cập nhật</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="container-fluid p-3 my-3 border border-dark custom">
                                        <h1>BIỂU ĐỒ KINH DOANH CHI TIẾT</h1>
                                        <div className="row">
                                            <div className="col-sm">
                                                <h4>BIỂU ĐỒ ĐÁNH GIÁ SỐ LƯỢNG XE ĐÃ BÁN</h4>
                                                {!!yearResult3 && yearResult3.map(quantity => (
                                                    <VerticalChart key="a"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loader}
                </>

            )}
        </div>
    )
}