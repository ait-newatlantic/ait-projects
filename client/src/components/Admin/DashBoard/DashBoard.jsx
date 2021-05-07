import React, { useEffect, useState } from "react"
import * as MaterialUIIcons from '@material-ui/icons/'
import { InputLabel } from '@material-ui/core'
import DemandService from '../../../services/demand.service'
import DemandChart from "../../DemandChart/DemandChart"

export default function AdminDashBoard() {
    const [flag, setFlag] = useState(0)
    const newDate = new Date()
    const year = newDate.getFullYear()

    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const n = month[newDate.getMonth()]

    const date = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
        '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']

    const d = date[newDate.getDate()-1]

    const [from_date, setFromDate] = useState(`${year}-01-01`)
    const [to_date, setToDate] = useState(`${year}-${n}-${d}`)
    const [demand_statuses, setDemandStatuses] = useState([])

    const onChangeFromDate = (e) => {
        const from_date = e.target.value
        setFromDate(from_date)
    }

    const onChangeToDate = (e) => {
        const to_date = e.target.value
        setToDate(to_date)
    }

    const handleSubmit = () => {
        const username = ""
        const branch_name = ""
        DemandService.get_demand_statuses(username, branch_name, from_date, to_date).then((response) => {
            setDemandStatuses(response.data)
        })
    }

    const onClickFlag = () => {
        if (flag == 0) {
            setFlag(1)
        }
        else setFlag(0)
    }

    useEffect(() => {
        handleSubmit()
    }, [from_date, to_date])

    return (
        <div>
            <div className="row">
                <div className="col d-flex justify-content-start">
                    <h4 className="font-weight-bold text-secondary text-left">DASHBOARD</h4>
                    <p className="font-weight-bold text-secondary">({from_date} đến {to_date})</p>
                </div>
                <div className="col d-flex justify-content-end">
                    <div>
                        <button className="btn btn-sm btn-hover" onClick={onClickFlag}>
                            <MaterialUIIcons.FilterList />FILTER
                    </button>
                    </div>
                </div>
            </div>
            {flag == 1 ?
                <div>
                    <div className="row">
                        <div className="col">
                            <InputLabel shrink>
                                Từ ngày
                </InputLabel>
                            <input
                                type="date"
                                className="form-control"
                                name="from_date"
                                value={from_date}
                                onChange={onChangeFromDate}
                            />
                        </div>
                        <div className="col">
                            <InputLabel shrink>
                                Đến ngày
                </InputLabel>
                            <input
                                type="date"
                                className="form-control"
                                name="to_date"
                                value={to_date}
                                onChange={onChangeToDate}
                            />
                        </div>
                    </div>
                </div>
                : <div></div>
            }
            <div>
                {!!demand_statuses && demand_statuses.map(month => (
                    <DemandChart key="chart"
                        tongcongdanggiaodich1={month.tongcongdanggiaodich01}
                        tongcongdanggiaodich2={month.tongcongdanggiaodich02}
                        tongcongdanggiaodich3={month.tongcongdanggiaodich03}
                        tongcongdanggiaodich4={month.tongcongdanggiaodich04}
                        tongcongdanggiaodich5={month.tongcongdanggiaodich05}
                        tongcongdanggiaodich6={month.tongcongdanggiaodich06}
                        tongcongdanggiaodich7={month.tongcongdanggiaodich07}
                        tongcongdanggiaodich8={month.tongcongdanggiaodich08}
                        tongcongdanggiaodich9={month.tongcongdanggiaodich09}
                        tongcongdanggiaodich10={month.tongcongdanggiaodich10}
                        tongcongdanggiaodich11={month.tongcongdanggiaodich11}
                        tongcongdanggiaodich12={month.tongcongdanggiaodich12}
                        danggiaodich1={month.danggiaodich1} thanhcong1={month.thanhcong1} thatbai1={month.thatbai1}
                        danggiaodich2={month.danggiaodich2} thanhcong2={month.thanhcong2} thatbai2={month.thatbai2}
                        danggiaodich3={month.danggiaodich3} thanhcong3={month.thanhcong3} thatbai3={month.thatbai3}
                        danggiaodich4={month.danggiaodich4} thanhcong4={month.thanhcong4} thatbai4={month.thatbai4}
                        danggiaodich5={month.danggiaodich5} thanhcong5={month.thanhcong5} thatbai5={month.thatbai5}
                        danggiaodich6={month.danggiaodich6} thanhcong6={month.thanhcong6} thatbai6={month.thatbai6}
                        danggiaodich7={month.danggiaodich7} thanhcong7={month.thanhcong7} thatbai7={month.thatbai7}
                        danggiaodich8={month.danggiaodich8} thanhcong8={month.thanhcong8} thatbai8={month.thatbai8}
                        danggiaodich9={month.danggiaodich9} thanhcong9={month.thanhcong9} thatbai9={month.thatbai9}
                        danggiaodich10={month.danggiaodich10} thanhcong10={month.thanhcong10} thatbai10={month.thatbai10}
                        danggiaodich11={month.danggiaodich11} thanhcong11={month.thanhcong11} thatbai11={month.thatbai11}
                        danggiaodich12={month.danggiaodich12} thanhcong12={month.thanhcong12} thatbai12={month.thatbai12} />
                ))}
            </div>
        </div>
    )
}