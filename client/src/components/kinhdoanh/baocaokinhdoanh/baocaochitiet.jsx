import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";
import "./style.css"

export default function BCCT() {
    
    const [year, setYear] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        Axios.get("http://localhost:8080/api/get/baocaokd/baocaochitiet/nam", {
            params: {
                year,
            }
        }).then((response) => {
            setYearResult(response.data);
        });
    }

    // const Update = () => {
    //     Axios.put("http://localhost:8080/api/put/baocaokd/baocaochitiet/", {         
    //         status: status, 
    //     })
    //     setStatus("")
    // }


    useEffect(() => {
        Axios.get("http://localhost:8080/api/get/baocaokd/baocaochitiet").then((response) => {
            setYearResult(response.data)
        })
    }, [])

    return (
        <div>
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

            <div className="container-fluid p-3 my-3 border border-dark">
                <h1>BÁO CÁO KINH DOANH CHI TIẾT</h1>
                <table className="table">
                    <tbody >
                        <tr id="titles">
                            <th colSpan="2">Thông tin nhân viên và ngày tháng</th>
                            <th colSpan="7">Thông tin khách hàng</th>
                            <th colSpan="4">Thông tin xe</th>
                            <th>Cập nhật</th>
                        </tr>
                        <tr>
                            <th>Người nhập</th>
                            <th>Người đi thực tế</th>
                            <th>Tên KH</th>
                            <th>SĐT KH</th>
                            <th>Loại KH</th>
                            <th>Khu vực KH</th>
                            <th>Ý kiến KH</th>
                            <th>Phương thức liên lạc</th>
                            <th>Giai đoạn</th>
                            <th>Model xe</th> 
                            <th>Loại xe</th> 
                            <th>Số lượng</th> 
                            <th>Màu xe</th>  
                            <th></th>
                        </tr>
                        {!!yearResult && yearResult.map(form => (
                            <tr className="content" key={form._id}>
                                <td>{form.employee}</td>
                                <td>{form.date_enter}</td>
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