import React, { useState } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";

export default function BCTQ(props) {

    const [year, setYear] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        Axios.get("http://localhost:8080/api/get/baocaokd/baocaotongquat", {
            params: {
                year,
            }
        }).then((response) => {
            setYearResult(response.data);
        });
    }

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

            <div class="container p-3 my-3 border border-dark">
                <h1>BÁO CÁO KINH DOANH TỔNG QUÁT</h1>
                <table class="table">
                    <tbody class="thead-light">
                        <tr id="titles">
                            <th>Năm</th>
                            <th>TỔNG CỘNG</th>
                            <th>TIẾP CẬN CHÀO HÀNG</th>
                            <th>ĐÀM PHÁN</th>
                            <th>CHỐT ĐƠN HÀNG</th>
                            <th>ĐÃ CỌC</th>
                            <th>ĐÃ THANH TOÁN TẠM ỨNG</th>
                            <th>HOÀN TẤT GIAO DỊCH</th>
                            <th>BÀN GIAO CHƯA THANH TOÁN</th>
                            <th>GIAO DỊCH THẤT BẠI</th>
                        </tr>
                        {!!yearResult && yearResult.map(form => (
                            <tr className="content" key={form._id}>
                                <td>{year}</td>
                                <td>{form.tongcong}</td>
                                <td>{form.tiepcanchaohang}</td>
                                <td>{form.damphan}</td>
                                <td>{form.chotdonhang}</td>
                                <td>{form.dacoc}</td>
                                <td>{form.thanhtoantamung}</td>
                                <td>{form.hoantatgiaodich}</td>
                                <td>{form.bangiaochuathanhtoan}</td>
                                <td>{form.giaodichthatbai}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}