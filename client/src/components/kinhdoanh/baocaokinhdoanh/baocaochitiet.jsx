import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import "./style.css"
import api from "../../../api/index"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function BCCT() {

    const [year, setYear] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        api.get("/api/get/nhucauthucte/nam", {
            params: {
                year,
            }
        }).then((response) => {
            setYearResult(response.data);
        });
    }

    useEffect(() => {
        api.get("/api/get/nhucauthucte").then((response) => {
            setYearResult(response.data)
        })
    }, [])

    return (
        <div>
            <div className="container-fluid p-3 my-3 border border-dark custom">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" >Năm</label>
                            <input type="year" className="form-control"
                                id="exampleFormControlInput1" onChange={e => setYear(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <Button block type="submit" onClick={Submit}>
                        Tra cứu
                        </Button>
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
                            <tr id="titles">
                                <th colSpan="2">Thông tin nhân viên</th>
                                <th colSpan="7">Thông tin khách hàng</th>
                                <th colSpan="4">Thông tin xe</th>
                                <th colSpan="3">Thông tin thêm</th>
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
                                <th>Ngày tạo form</th>
                                <th>Lần cập nhật cuối cùng</th>
                                <th>Ghi chú</th>

                            </tr>
                            {!!yearResult && yearResult.map(form => (
                                <tr className="content" key={form._id}>
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
                                    <td>{form.date_enter}</td>
                                    <td>{form.date_update}</td>
                                    <td>{form.note}</td>
                                    <td>
                                        <a className="btn btn-warning btn-sm" href={`/kinhdoanh/capnhat/nhucauthucte/${form.id}`} role="button">Cập nhật</a>
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