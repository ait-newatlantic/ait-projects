import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import DemandChart from "../DemandChart/DemandChart"
import DemandService from "../../services/demand.service"
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import CustomerService from "../../services/customer.service";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';

export default function DemandOverallReport() {

    const [fromdate, setFromDate] = useState('2020-01-01');
    const [todate, setToDate] = useState('2030-01-01');
    const [usertResult, setUserResult] = useState();
    const [customertResult, setCustomerResult] = useState();
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();
    const [content, setContent] = useState("");
    const [loader, showLoader, hideLoader] = useFullPageLoader()

    const FetchTotal = () => {
        showLoader()
        const employee = ""
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
        showLoader()
        const employee = ""
        DemandService.get_overall(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult2(response.data);
        });
    }

    const FetchUsers = () => {
        showLoader()
        UserService.get_users().then((response) => {
            hideLoader()
            setUserResult(response.data.length);
        });
    }

    const FetchCustomers = () => {
        showLoader()
        CustomerService.get_customers().then((response) => {
            hideLoader()
            setCustomerResult(response.data.length);
        });
    }

    const Submit = () => {
        FetchTotal()
        FetchOverall()
    }

    useEffect(() => {
        FetchCustomers()
        FetchUsers()
        FetchOverall()
        FetchTotal()
    }, [])

    useEffect(() => {
        UserService.getAdminBoard().then(
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
        <div className="custom">
            { content == "Admin" ?
                <>
                    {!!yearResult && yearResult.map(form => (
                        <div className="card-deck">
                            <div class="card bg-light mb-3" >
                                <div class="card-header">Kinh doanh <AttachMoneyIcon /></div>
                                <div class="card-body">
                                    <h5 class="card-title">Số xe bán được</h5>
                                    <h4 class="card-text">{form.hoantatgiaodich}/{form.tongcong}</h4>
                                </div>
                            </div>
                            <div class="card bg-light mb-3" >
                                <div class="card-header">Khách hàng <PeopleIcon /></div>
                                <div class="card-body">
                                    <h5 class="card-title">Số khách hàng</h5>
                                    <h4 class="card-text">{customertResult}</h4>
                                </div>
                            </div>
                            <div class="card bg-light mb-3" >
                                <div class="card-header">Users <PersonIcon /></div>
                                <div class="card-body">
                                    <h5 class="card-title">Số Users</h5>
                                    <h4 class="card-text">{usertResult}</h4>
                                </div>
                            </div>
                            <div class="card bg-light mb-3" >
                                <div class="card-header">Chi nhánh <BusinessIcon /></div>
                                <div class="card-body">
                                    <h5 class="card-title">Số chi nhánh</h5>
                                    <h4 class="card-text">14</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="card-deck">
                        <div className="card">
                            <h4><SearchIcon /></h4>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                                    <input type="date" className="form-control"
                                        id="exampleFormControlInput1" onChange={e => setFromDate(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                                    <input type="date" className="form-control"
                                        id="exampleFormControlInput1" onChange={e => setToDate(e.target.value)} />
                                </div>
                            </div>
                            <Button block type="submit" onClick={Submit}>
                                Tra cứu
                        </Button>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5>BIỂU ĐỒ KINH DOANH TỔNG QUÁT</h5>
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
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="card-group">
                        <div className="card">
                            <div className="card-body">
                                <h5>BÁO CÁO KINH DOANH TỔNG QUÁT</h5>
                                <div className="table-container">
                                    <table className="table">
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
                        </div>
                    </div>
                    {loader}
                </> :
                <div>{content}</div>
            }
        </div>
    )
}