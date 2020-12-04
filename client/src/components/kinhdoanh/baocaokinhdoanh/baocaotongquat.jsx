import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import api from "../../../api/index"

export default function BCTQ(props) {

    const [fromdate, setFromDate] = useState('');
    const [todate, setToDate] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        api.get("/api/demands/total", {
            params: {
                fromdate,
                todate,
            }
        }).then((response) => {
            setYearResult(response.data);
        });
    }

    return (
        <div>
            <div className="container-fluid p-3 my-3 border border-dark custom">
            <div className="row">
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                            <input type="date" className="form-control"
                                id="exampleFormControlInput1" onChange={e => setFromDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                            <input type="date" className="form-control"
                                id="exampleFormControlInput1" onChange={e => setToDate(e.target.value)} />
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
                <h1>BÁO CÁO KINH DOANH TỔNG QUÁT</h1>
                <table className="table">
                    <tbody>
                        <tr id="titles">
                            <th>TỔNG CỘNG</th>
                            <th>TIẾP CẬN CHÀO HÀNG</th>
                            <th>CHẠY THỬ</th>
                            <th>ĐÀM PHÁN</th>
                            <th>CHỐT ĐƠN HÀNG</th>
                            <th>ĐÃ CỌC</th>
                            <th>ĐÃ THANH TOÁN TẠM ỨNG</th>
                            <th>HOÀN TẤT GIAO DỊCH</th>
                            <th>BÀN GIAO CHƯA THANH TOÁN</th>
                            <th>LÊN HỢP ĐỒNG</th>
                            <th>GIAO DỊCH THẤT BẠI</th>
                        </tr>
                        {!!yearResult && yearResult.map(form => (
                            <tr className="content" key={form._id}>
                                <td>{form.tongcong}</td>
                                <td>{form.tiepcanchaohang}</td>
                                <td>{form.chaythu}</td>
                                <td>{form.damphan}</td>
                                <td>{form.chotdonhang}</td>
                                <td>{form.dacoc}</td>
                                <td>{form.dathanhtoantamung}</td>
                                <td>{form.hoantatgiaodich}</td>
                                <td>{form.bangiaochuathanhtoan}</td>
                                <td>{form.lenhopdong}</td>
                                <td>{form.giaodichthatbai}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}