import React, { useEffect, useState } from 'react'
import DemandChart from "../DemandChart/DemandChart"
import DemandLineChart from "../DemandLineChart/DemandLineChart.jsx"
import BranchDemandDetailReport from "../BranchDemandDetailReport/BranchDemandDetailReport"
import CarChart from "../CarChart/CarChart"
import CarPieChart from "../CarPieChart/CarPieChart"
import DemandService from "../../services/demand.service"
import AuthService from "../../services/auth.service";
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import CustomerService from "../../services/customer.service";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import "./style.css"

export default function DemandOverallReport() {
    const newDate = new Date()
    const year = newDate.getFullYear()

    const [fromdate, setFromDate] = useState(`${year}-1-1`);
    const [todate, setToDate] = useState(`${year}-12-31`);
    const [usertResult, setUserResult] = useState();
    const [customertResult, setCustomerResult] = useState();
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();
    const [yearResult4, setYearResult4] = useState();
    const [content, setContent] = useState("");
    const [flag, setFlag] = useState(0)
    const [flag1, setFlag1] = useState(0)
    const [btnName, setbtnName] = useState("")
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const currentUser = AuthService.getCurrentUser();

    const FetchTotal = () => {
        showLoader()
        const employee = currentUser.username.split('.')[0]
        DemandService.get_total(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult(response.data);
        });
    }

    const FetchOverall = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_overall(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult2(response.data);
        });
    }

    const FetchDemandQuantity = () => {
        const employee = currentUser.username.split('.')[0]
        DemandService.get_all_quantity(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult4(response.data)
        })
    }

    const FetchUsers = () => {
        UserService.get_users_specific(currentUser.username.split('.')[0]).then((response) => {
            setUserResult(response.data.length);
        });
    }

    const FetchCustomers = () => {
        CustomerService.get_customers(currentUser.username.split('.')[0]).then((response) => {
            setCustomerResult(response.data.length);
        });
    }

    const OnClickChart = () => {
        if (flag == 0 || flag == 3) {
            FetchDemandQuantity()
            setFlag(1)
            setbtnName("Biểu đồ (2/2)")
        }
        else if (flag == 2) {
            FetchOverall()
            setFlag(0)
            setbtnName("Biểu đồ (1/2)")
        }
        else {
            FetchOverall()
            setFlag(0)
            setbtnName("Biểu đồ (1/2)")
        }
    }

    const OnClickLineChart = () => {
        if (flag == 0) {
            FetchOverall()
            setFlag(2)
        }
        else {
            setFlag(0)
        }
    }

    const OnClickPieChart = () => {
        if (flag == 1) {
            setFlag(3)
        }
        else {
            setFlag(1)
        }
    }

    const Submit = () => {
        FetchTotal()
        FetchOverall()
    }

    useEffect(() => {
        FetchOverall()
        FetchTotal()
        FetchCustomers()
        FetchUsers()
        setbtnName("Biểu đồ (1/2)")
    }, [])

    useEffect(() => {
        UserService.getModeratorBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <>
        <div className="custom">
            {loader}
            {content === "Moderator" ?
                <div>
                    <div className="card-deck">
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                {!!yearResult && yearResult.map(form => (
                                    <div className="card-deck">
                                        <div className="card text-white bg-primary mb-3" style={{ width: "18rem" }}>
                                            <div className="card-header">Kinh doanh <AttachMoneyIcon /></div>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ color: "white" }}>Số xe</h5>
                                                <h4 className="card-text" style={{ color: "white" }}>{form.hoantatgiaodich}/{form.tongcong}</h4>
                                            </div>
                                            <div className="card-footer">
                                                <small class="text-white">Từ {fromdate} đến {todate}</small>
                                            </div>
                                        </div>
                                        <div className="card bg-danger text-white mb-3" style={{ width: "18rem" }}>
                                            <div className="card-header">Khách hàng <PeopleIcon /></div>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ color: "white" }}>Số khách hàng</h5>
                                                <h4 className="card-text" style={{ color: "white" }}>{customertResult}</h4>
                                            </div>
                                            <div className="card-footer">
                                                <small class="text-white">Từ 2015 đến {year}</small>
                                            </div>
                                        </div>
                                        <div className="card text-white mb-3" style={{ backgroundColor: "#6a0dad", width: "18rem" }}>
                                            <div className="card-header">Users <PersonIcon /></div>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ color: "white" }}>Số Users</h5>
                                                <h4 className="card-text" style={{ color: "white" }}>{usertResult}</h4>
                                            </div>
                                            <div className="card-footer">
                                                <small class="text-white">Từ 2015 đến {year}</small>
                                            </div>
                                        </div>
                                        <div className="card text-white bg-warning mb-3" style={{ width: "18rem" }}>
                                            <div className="card-header">Chi nhánh <BusinessIcon /></div>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ color: "white" }}>Số chi nhánh</h5>
                                                <h4 className="card-text" style={{ color: "white" }}>13</h4>
                                            </div>
                                            <div className="card-footer">
                                                <small class="text-white">Từ 2015 đến {year}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="card-deck">
                                    <div className="card bg-light mb-3">
                                        <div className="card-header">TRA CỨU BIỂU ĐỒ VÀ BÁO CÁO TỔNG QUÁT <SearchIcon /></div>
                                        <div className="card-body">
                                            <h6>TỪ NGÀY</h6>
                                            <input type="date" className="form-control form-control-sm" id="colFormLabelSm" onChange={e => setFromDate(e.target.value)} />
                                            <br />
                                            <h6>ĐẾN NGÀY</h6>
                                            <input type="date" className="form-control form-control-sm" id="colFormLabelSm" onChange={e => setToDate(e.target.value)} />
                                            <br />
                                            <div className="row">
                                                <div className="col-sm">
                                                    <button type="button" className="btn btn-info btn-block" onClick={Submit}>
                                                        Tra cứu
                                                    </button>
                                                </div>
                                                <div className="col-sm">
                                                    <button type="button" className="btn btn-success btn-block" onClick={OnClickChart}>
                                                        {btnName}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card bg-light mb-3" style={{ width: "18rem" }}>
                                        {flag === 0 ?
                                            <div>
                                                <div className="card-header text-white bg-dark">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            BIỂU ĐỒ KINH DOANH 12 THÁNG ({fromdate} đến {todate})
                                                    </div>
                                                        <div className="col-sm">
                                                            <button type="button" className="btn btn-secondary btn-sm" style={{ float: "right" }} onClick={OnClickLineChart}>
                                                                Biểu đồ đường
                                                    </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!!yearResult2 && yearResult2.map(month => (
                                                    <DemandChart key="a"
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
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 1 ?
                                            <div>
                                                <div className="card-header text-white bg-primary">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            BIỂU ĐỒ SỐ LƯỢNG XE ĐÃ BÁN ({fromdate} đến {todate})
                                                    </div>
                                                        <div className="col-sm">
                                                            <button type="button" className="btn btn-secondary btn-sm" style={{ float: "right" }} onClick={OnClickPieChart}>
                                                                Biểu đồ bánh
                                                    </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!!yearResult4 && yearResult4.map(quantity => (
                                                    <CarChart key="a"
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
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 2 ?
                                            <div>
                                                <div className="card-header text-white bg-dark">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            BIỂU ĐỒ KINH DOANH 12 THÁNG ({fromdate} đến {todate})
                                                    </div>
                                                        <div className="col-sm">
                                                            <button type="button" className="btn btn-secondary btn-sm" style={{ float: "right" }} onClick={OnClickLineChart}>
                                                                Biểu đồ cột
                                                    </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!!yearResult2 && yearResult2.map(month => (
                                                    <DemandLineChart key="a"
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
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 3 ?
                                            <div>
                                                <div className="card-header text-white bg-primary">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            BIỂU ĐỒ SỐ LƯỢNG XE ĐÃ BÁN ({fromdate} đến {todate})
                                                    </div>
                                                        <div className="col-sm">
                                                            <button type="button" className="btn btn-secondary btn-sm" style={{ float: "right" }} onClick={OnClickPieChart}>
                                                                Biểu đồ cột ngang
                                                    </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!!yearResult4 && yearResult4.map(quantity => (
                                                    <CarPieChart key="a"
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
                                            </div> :
                                            <div></div>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className="table-container">
                                        <div className="card-header text-white" style={{ backgroundColor: "#24305E" }}>BÁO CÁO KINH DOANH TỔNG QUÁT ({fromdate} đến {todate})</div>
                                        <table className="table" key="a">
                                            <tbody>
                                                <tr id="titles">
                                                    <th>TỔNG CỘNG (XE)</th>
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
                                <br />
                                <BranchDemandDetailReport fromdate={fromdate} todate={todate} />
                            </div>
                        </div>
                    </div>
                </div> :
                <div>{content}</div>
            }
        </div>
    </>
    )
}