import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import GroupChart from "../../chart/group"
import DemandService from "../../../services/demand.service"

export default function BCTQ(props) {

    const [fromdate, setFromDate] = useState('2020-01-01');
    const [todate, setToDate] = useState('2030-01-01');
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();

    const Submit = () => {
        DemandService.get_total(
            fromdate,
            todate,
        ).then((response) => {
            setYearResult(response.data);
        });
        DemandService.get_overall(
            fromdate,
            todate,
        ).then((response) => {
            setYearResult2(response.data);
        });
    }

    useEffect(() => {
        DemandService.get_total(
            fromdate,
            todate,
        ).then((response) => {
            setYearResult(response.data);
        });
    }, [])

    useEffect(() => {
        DemandService.get_overall(
            fromdate,
            todate,
        ).then((response) => {
            setYearResult2(response.data);
        });
    }, [])


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
            <div className="row">
                <div className="col-sm">
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
                <div className="col-sm">
                    <div className="container-fluid p-3 my-3 border border-dark custom">
                        <h1>BIỂU ĐỒ KINH DOANH TỔNG QUÁT</h1>
                        {!!yearResult2 && yearResult2.map(month => (
                            <GroupChart key="a"
                                dukien1={month.dukien1} thucte1={month.thucte1}
                                dukien2={month.dukien2} thucte2={month.thucte2}
                                dukien3={month.dukien3} thucte3={month.thucte3}
                                dukien4={month.dukien4} thucte4={month.thucte4}
                                dukien5={month.dukien5} thucte5={month.thucte5}
                                dukien6={month.dukien6} thucte6={month.thucte6}
                                dukien7={month.dukien7} thucte7={month.thucte7}
                                dukien8={month.dukien8} thucte8={month.thucte8}
                                dukien9={month.dukien9} thucte9={month.thucte9}
                                dukien10={month.dukien10} thucte10={month.thucte10}
                                dukien11={month.dukien11} thucte11={month.thucte11}
                                dukien12={month.dukien12} thucte12={month.thucte12} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}