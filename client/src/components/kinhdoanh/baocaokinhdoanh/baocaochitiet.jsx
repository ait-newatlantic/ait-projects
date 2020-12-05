import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import "./style.css"
import DemandService from "../../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function BCCT() {

    const [fromdate, setFromDate] = useState('');
    const [todate, setToDate] = useState('');
    const [datetype, setDateType] = useState('');
    const [yearResult, setYearResult] = useState();
    // const [updateats, setUpdateAt] = useState([])

    const getDate = () => {
        DemandService.get_date(fromdate, todate).then((response) => {
            setYearResult(response.data);
            console.log(response.data)
        });
    }

    const getUpdatedAt = () => {
        DemandService.get_updateAt(fromdate, todate).then((response) => {
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

    const Submit =  () => {
        if(datetype === "Ngày tạo form"){
            getCreatedAt()
        }
        if(datetype === "Ngày cập nhật gần nhất"){
            getUpdatedAt()
        }
        if(datetype === "Ngày đi thực tế"){
            getGoAt()
        }
        if(datetype === "Tất cả các ngày"){
            getDate()
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

    useEffect(() => {
        DemandService.get_demands().then((response) => {
            setYearResult(response.data)
        })
    }, [])

    return (
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
                <h1>BÁO CÁO KINH DOANH CHI TIẾT</h1>
                <div>
                    <ReactHTMLTableToExcel
                        className="btn btn-info"
                        table="emp"
                        filename="Báo cáo kinh doanh"
                        sheet="Sheet"
                        buttonText="Export excel" />
                </div>
                <div className="table-container">
                    <table id="emp" className="table-lg">
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
    )
}