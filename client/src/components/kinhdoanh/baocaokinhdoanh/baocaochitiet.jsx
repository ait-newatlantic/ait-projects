import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";
import "./style.css"

export default function BCCT() {
    
    const [year, setYear] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        Axios.get("http://localhost:8080/api/get/nhucauthucte/nam", {
            params: {
                year,
            }
        }).then((response) => {
            setYearResult(response.data);
        });
    }

    // const Update = () => {
    //     Axios.put("http://localhost:8080/api/put/nhucauthucte/", {         
    //         status: status, 
    //     })
    //     setStatus("")
    // }


    useEffect(() => {
        Axios.get("http://localhost:8080/api/get/nhucauthucte").then((response) => {
            setYearResult(response.data)
        })
    }, [])

    return (
        <div className="container-fluid">
            <div class="container p-3 my-3 border border-dark">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label for="exampleFormControlInput1" >Năm</label>
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

            <div className="container p-3 my-3 border border-dark">
                <h1>BÁO CÁO KINH DOANH CHI TIẾT</h1>
                <table className="table-sm">
                    <tbody >
                        <tr id="titles">
                            <th colSpan="2">Thông tin nhân viên và ngày tháng</th>
                            <th colSpan="7">Thông tin khách hàng</th>
                            <th colSpan="4">Thông tin xe</th>
                            <th rowspan="2">Cập nhật</th>
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
                                <td>
                                    <a class="btn btn-warning btn-sm" href={`/kinhdoanh/capnhat/nhucauthucte/${form.id}`} role="button">Cập nhật</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}