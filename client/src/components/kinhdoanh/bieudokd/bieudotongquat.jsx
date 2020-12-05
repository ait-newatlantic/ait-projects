import React from 'react'
import GroupChart from "../../chart/group"
import { useState } from 'react'
import { Button } from "react-bootstrap";
import DemandService from "../../../services/demand.service"
import "./style.css"

export default function BDTQ() {
    const [fromdate, setFromDate] = useState('');
    const [todate, setToDate] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        DemandService.get_overall(
            fromdate,
            todate,
        ).then((response) => {
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
                <h1>BIỂU ĐỒ ĐÁNH GIÁ KINH DOANH TỔNG QUÁT</h1>
                {!!yearResult && yearResult.map(month => (
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
    )
}