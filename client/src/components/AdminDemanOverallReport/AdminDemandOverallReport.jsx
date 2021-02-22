import React, { useEffect, useState } from 'react'
import DemandChart from "../DemandChart/DemandChart"
import DemandLineChart from "../DemandLineChart/DemandLineChart.jsx"
import BranchChart from "../BranchChart/BranchChart"
import CarChart from "../CarChart/CarChart"
import CarPieChart from "../CarPieChart/CarPieChart"
import BranchCustomerChart from "../BranchCustomerChart/BranchCustomerChart"
import DemandService from "../../services/demand.service"
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import CustomerService from "../../services/customer.service";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import * as MaterialUIIcons from '@material-ui/icons/';
import "./style.css";
import OverallChart from '../OverallChart/OverallChart'

export default function DemandOverallReport() {

    const newDate = new Date()
    const year = newDate.getFullYear()

    const [fromdate, setFromDate] = useState(`${year}-1-1`);
    const [todate, setToDate] = useState(`${year}-12-31`);
    const [usertResult, setUserResult] = useState();
    const [customertResult, setCustomerResult] = useState();
    const [branchcustomertResult, setBranchCustomerResult] = useState();
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();
    const [yearResult3, setYearResult3] = useState();
    const [yearResult4, setYearResult4] = useState();
    const [content, setContent] = useState("");
    const [flag, setFlag] = useState(0)
    const [btnName, setbtnName] = useState("")
    const [branch, setBranch] = useState("");
    const [loader, showLoader, hideLoader] = useFullPageLoader()

    const FetchTotal = () => {
        showLoader()
        const employee = branch
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
        const employee = ""
        DemandService.get_overall(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult2(response.data);
        });
    }

    const onChangeBranch = (e) => {
        const branch = e.target.value;
        setBranch(branch);
        const employee = branch
        DemandService.get_total(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult(response.data);
        });
    }

    const FetchDemandModels = () => {
        const employee = ""
        DemandService.get_all_models(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult3(response.data)
        })
    }

    const FetchDemandQuantity = () => {
        const employee = ""
        DemandService.get_all_quantity(
            employee,
            fromdate,
            todate,
        ).then((response) => {
            setYearResult4(response.data)
        })
    }

    const FetchUsers = () => {
        UserService.get_users().then((response) => {
            setUserResult(response.data.length);
        });
    }

    const FetchCustomers = () => {
        CustomerService.get_customers("").then((response) => {
            setCustomerResult(response.data.length);
        });
    }

    const FetchBranchCustomerQuantity = () => {
        CustomerService.get_quantity().then((response) => {
            setBranchCustomerResult(response.data);
        });
    }

    const OnClickChart = () => {
        if (flag === 0 || flag === 4) {
            FetchDemandQuantity()
            setFlag(1)
            setbtnName("Biểu đồ (2/4)")
        }
        else if (flag === 1 || flag === 5) {
            FetchBranchCustomerQuantity()
            setFlag(2)
            setbtnName("Biểu đồ (3/4)")
        }
        else if (flag === 2) {
            FetchDemandModels()
            setFlag(3)
            setbtnName("Biểu đồ (4/4)")
        }
        else if (flag === 3) {
            FetchOverall()
            setFlag(0)
            setbtnName("Biểu đồ (1/4)")
        }
        else {
            FetchOverall()
            setFlag(0)
            setbtnName("Biểu đồ (1/4)")
        }
    }

    const OnClickLineChart = () => {
        if (flag === 0) {
            FetchOverall()
            setFlag(4)
        }
        else {
            setFlag(0)
        }
    }

    const OnClickPieChart = () => {
        if (flag === 1) {
            setFlag(5)
        }
        else {
            setFlag(1)
        }
    }

    const Submit = () => {
        FetchTotal()
        FetchOverall()
        FetchDemandModels()
        FetchDemandQuantity()
        FetchBranchCustomerQuantity()
    }

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

    useEffect(() => {
        setbtnName("Biểu đồ (1/4)")
        FetchOverall()
        FetchTotal()
        FetchCustomers()
        FetchUsers()
    }, [])

    return (
        <>
            {loader}
            {content === "Admin" ?
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex md:flex-col mr-auto">
                                <div className="d-inline-flex">
                                    <input className="form-control" type="date"
                                        id="exampleFormControlInput1" onChange={e => setFromDate(e.target.value)} />
                                </div>
                                <div className="d-inline-flex p-2">
                                    <MaterialUIIcons.ArrowForward />
                                </div>
                                <div className="d-inline-flex">
                                    <input type="date" className="form-control"
                                        id="exampleFormControlInput1" onChange={e => setToDate(e.target.value)} />
                                </div>
                                <div className="d-inline-flex pl-2">
                                    <button type="button" className="btn btn-primary" onClick={Submit}>
                                        <MaterialUIIcons.Search />Tra cứu
                                                </button>
                                </div>
                            </div>
                            <span>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            </span>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div>
                            {!!yearResult && yearResult.map(form => (
                                <div className="card-deck">
                                    <div className="card text-black bg-light mb-3" style={{ width: "18rem" }}>
                                        <div className="card-header text-white" style={{ background: "#4169e1" }}>Kinh doanh <AttachMoneyIcon />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Số xe</h5>
                                            <h4 className="card-text">{form.hoantatgiaodich}/{form.tongcong}</h4>
                                        </div>
                                        <div className="card-footer">
                                            <p className="card-text"><small className="text-muted">{fromdate} đến {todate}</small></p>
                                        </div>
                                    </div>
                                    <div className="card text-black bg-light mb-3" style={{ width: "18rem" }}>
                                        <div className="card-header text-white" style={{ background: "#4169e1" }}>Khách hàng <PeopleIcon /></div>
                                        <div className="card-body">
                                            <h5 className="card-title" >Số khách hàng</h5>
                                            <h4 className="card-text" >{customertResult}</h4>
                                        </div>
                                        <div className="card-footer">
                                            <p className="card-text"><small className="text-muted">2015 đến {year}</small></p>
                                        </div>
                                    </div>
                                    <div className="card text-black bg-light mb-3" style={{ width: "18rem" }}>
                                        <div className="card-header text-white" style={{ background: "#4169e1" }}>Users <PersonIcon /></div>
                                        <div className="card-body">
                                            <h5 className="card-title" >Số Users</h5>
                                            <h4 className="card-text" >{usertResult}</h4>
                                        </div>
                                        <div className="card-footer">
                                            <p className="card-text"><small className="text-muted">2015 đến {year}</small></p>
                                        </div>
                                    </div>
                                    <div className="card text-black bg-light mb-3" style={{ width: "18rem" }}>
                                        <div className="card-header text-white" style={{ background: "#4169e1" }}>Chi nhánh <BusinessIcon /></div>
                                        <div className="card-body">
                                            <h5 className="card-title" >Số chi nhánh</h5>
                                            <h4 className="card-text" >13</h4>
                                        </div>
                                        <div className="card-footer">
                                            <p className="card-text"><small className="text-muted">2015 đến {year}</small></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="card-deck">
                                <div className="card bg-light mb-3">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between md:flex-col mr-auto">
                                            <div className="d-inline-flex">
                                                BÁO CÁO TỔNG QUÁT ({fromdate} đến {todate})
                                            </div>
                                            <div className="d-inline-flex">
                                                <select className="form-control col-sm" name="branch" id="branch" onChange={onChangeBranch}>
                                                    <option value="">Tất cả</option>
                                                    <option value="NVL">NVL</option>
                                                    <option value="PDA">PDA</option>
                                                    <option value="DONGNAI">DONGNAI</option>
                                                    <option value="QUANGTRI">QUANGTRI</option>
                                                    <option value="DANANG">DANANG</option>
                                                    <option value="VUNGTAU">VUNGTAU</option>
                                                    <option value="GIALAI">GIALAI</option>
                                                    <option value="TAYNINH">TAYNINH</option>
                                                    <option value="DAKLAK">DAKLAK</option>
                                                    <option value="LAMDONG">LAMDONG</option>
                                                    <option value="CANTHO">CANTHO</option>
                                                    <option value="BINHPHUOC">BINHPHUOC</option>
                                                    <option value="HUNGYEN">HUNGYEN</option>
                                                    <option value="BINHDINH">BINHDINH</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {!!yearResult && yearResult.map(form => (
                                            <OverallChart
                                                tiepcanchaohang={form.tiepcanchaohang}
                                                chotdonhang={form.chotdonhang}
                                                chaythu={form.chaythu}
                                                damphan={form.damphan}
                                                dacoc={form.dacoc}
                                                dathanhtoantamung={form.dathanhtoantamung}
                                                hoantatgiaodich={form.hoantatgiaodich}
                                                bangiaochuathanhtoan={form.bangiaochuathanhtoan}
                                                lenhopdong={form.lenhopdong}
                                                giaodichthatbai={form.giaodichthatbai}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="card bg-light mb-3">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between md:flex-col mr-auto">
                                            <div className="d-inline-flex">
                                                BIỂU ĐỒ KINH DOANH ({fromdate} đến {todate})
                                            </div>
                                            <div className="d-inline-flex">
                                                <button type="button" className="btn btn-primary" onClick={OnClickChart}>
                                                    {btnName}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {flag === 0 ?
                                            <div>
                                                <h6 className='title'>Biểu đồ kinh doanh 12 tháng</h6>
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
                                                <div className="text-right">
                                                    <button type="button" className="btn btn-primary" onClick={OnClickLineChart}>
                                                        Biểu đồ đường
                                                </button>
                                                </div>
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 1 ?
                                            <div>
                                                <h6 className='title'>Biểu đồ xe đã bán</h6>
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
                                                <div className="text-right">
                                                    <button type="button" className="btn btn-primary" onClick={OnClickPieChart}>
                                                        Biểu đồ bánh
                                                </button>
                                                </div>
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 2 ?
                                            <div>
                                                <h6 className='title'>Biểu đồ khách hàng từng chi nhánh</h6>
                                                {!!branchcustomertResult && branchcustomertResult.map(quantity => (
                                                    <BranchCustomerChart key="a"
                                                        nvl={quantity.nvl}
                                                        gialai={quantity.gialai}
                                                        lamdong={quantity.lamdong}
                                                        vungtau={quantity.vungtau}
                                                        binhphuoc={quantity.binhphuoc}
                                                        cantho={quantity.cantho}
                                                        daklak={quantity.daklak}
                                                        danang={quantity.danang}
                                                        quangtri={quantity.quangtri}
                                                        hungyen={quantity.hungyen}
                                                        tayninh={quantity.tayninh}
                                                        binhdinh={quantity.binhdinh}
                                                        dongnai={quantity.dongnai}
                                                        pda={quantity.pda}
                                                    />
                                                ))}
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 3 ?
                                            <div>
                                                <h6 className='title'>Biểu đồ kinh doanh từng chi nhánh</h6>
                                                {!!yearResult3 && yearResult3.map(model => (
                                                    <BranchChart key="a"
                                                        nvl_6540={model.nvl_6540}
                                                        vungtau_6540={model.vungtau_6540}
                                                        daklak_6540={model.daklak_6540}
                                                        lamdong_6540={model.lamdong_6540}
                                                        dongnai_6540={model.dongnai_6540}
                                                        gialai_6540={model.gialai_6540}
                                                        binhphuoc_6540={model.binhphuoc_6540}
                                                        cantho_6540={model.cantho_6540}
                                                        danang_6540={model.danang_6540}
                                                        quangtri_6540={model.quangtri_6540}
                                                        hungyen_6540={model.hungyen_6540}
                                                        tayninh_6540={model.tayninh_6540}
                                                        pda_6540={model.pda_6540}

                                                        nvl_6460={model.nvl_6460}
                                                        vungtau_6460={model.vungtau_6460}
                                                        daklak_6460={model.daklak_6460}
                                                        lamdong_6460={model.lamdong_6460}
                                                        dongnai_6460={model.dongnai_6460}
                                                        gialai_6460={model.gialai_6460}
                                                        binhphuoc_6460={model.binhphuoc_6460}
                                                        cantho_6460={model.cantho_6460}
                                                        danang_6460={model.danang_6460}
                                                        quangtri_6460={model.quangtri_6460}
                                                        hungyen_6460={model.hungyen_6460}
                                                        tayninh_6460={model.tayninh_6460}
                                                        pda_6460={model.pda_6460}

                                                        nvl_43253={model.nvl_43253}
                                                        vungtau_43253={model.vungtau_43253}
                                                        daklak_43253={model.daklak_43253}
                                                        lamdong_43253={model.lamdong_43253}
                                                        dongnai_43253={model.dongnai_43253}
                                                        gialai_43253={model.gialai_43253}
                                                        binhphuoc_43253={model.binhphuoc_43253}
                                                        cantho_43253={model.cantho_43253}
                                                        danang_43253={model.danang_43253}
                                                        quangtri_43253={model.quangtri_43253}
                                                        hungyen_43253={model.hungyen_43253}
                                                        tayninh_43253={model.tayninh_43253}
                                                        pda_43253={model.pda_43253}

                                                        nvl_43265={model.nvl_43265}
                                                        vungtau_43265={model.vungtau_43265}
                                                        daklak_43265={model.daklak_43265}
                                                        lamdong_43265={model.lamdong_43265}
                                                        dongnai_43265={model.dongnai_43265}
                                                        gialai_43265={model.gialai_43265}
                                                        binhphuoc_43265={model.binhphuoc_43265}
                                                        cantho_43265={model.cantho_43265}
                                                        danang_43265={model.danang_43265}
                                                        quangtri_43265={model.quangtri_43265}
                                                        hungyen_43265={model.hungyen_43265}
                                                        tayninh_43265={model.tayninh_43265}
                                                        pda_43265={model.pda_43265}

                                                        nvl_43266={model.nvl_43266}
                                                        vungtau_43266={model.vungtau_43266}
                                                        daklak_43266={model.daklak_43266}
                                                        lamdong_43266={model.lamdong_43266}
                                                        dongnai_43266={model.dongnai_43266}
                                                        gialai_43266={model.gialai_43266}
                                                        binhphuoc_43266={model.binhphuoc_43266}
                                                        cantho_43266={model.cantho_43266}
                                                        danang_43266={model.danang_43266}
                                                        quangtri_43266={model.quangtri_43266}
                                                        hungyen_43266={model.hungyen_43266}
                                                        tayninh_43266={model.tayninh_43266}
                                                        pda_43266={model.pda_43266}

                                                        nvl_53228={model.nvl_53228}
                                                        vungtau_53228={model.vungtau_53228}
                                                        daklak_53228={model.daklak_53228}
                                                        lamdong_53228={model.lamdong_53228}
                                                        dongnai_53228={model.dongnai_53228}
                                                        gialai_53228={model.gialai_53228}
                                                        binhphuoc_53228={model.binhphuoc_53228}
                                                        cantho_53228={model.cantho_53228}
                                                        danang_53228={model.danang_53228}
                                                        quangtri_53228={model.quangtri_53228}
                                                        hungyen_53228={model.hungyen_53228}
                                                        tayninh_53228={model.tayninh_53228}
                                                        pda_53228={model.pda_53228}

                                                        nvl_53229={model.nvl_53229}
                                                        vungtau_53229={model.vungtau_53229}
                                                        daklak_53229={model.daklak_53229}
                                                        lamdong_53229={model.lamdong_53229}
                                                        dongnai_53229={model.dongnai_53229}
                                                        gialai_53229={model.gialai_53229}
                                                        binhphuoc_53229={model.binhphuoc_53229}
                                                        cantho_53229={model.cantho_53229}
                                                        danang_53229={model.danang_53229}
                                                        quangtri_53229={model.quangtri_53229}
                                                        hungyen_53229={model.hungyen_53229}
                                                        tayninh_53229={model.tayninh_53229}
                                                        pda_53229={model.pda_53229}

                                                        nvl_65115={model.nvl_65115}
                                                        vungtau_65115={model.vungtau_65115}
                                                        daklak_65115={model.daklak_65115}
                                                        lamdong_65115={model.lamdong_65115}
                                                        dongnai_65115={model.dongnai_65115}
                                                        gialai_65115={model.gialai_65115}
                                                        binhphuoc_65115={model.binhphuoc_65115}
                                                        cantho_65115={model.cantho_65115}
                                                        danang_65115={model.danang_65115}
                                                        quangtri_65115={model.quangtri_65115}
                                                        hungyen_65115={model.hungyen_65115}
                                                        tayninh_65115={model.tayninh_65115}
                                                        pda_65115={model.pda_65115}

                                                        nvl_65116={model.nvl_65116}
                                                        vungtau_65116={model.vungtau_65116}
                                                        daklak_65116={model.daklak_65116}
                                                        lamdong_65116={model.lamdong_65116}
                                                        dongnai_65116={model.dongnai_65116}
                                                        gialai_65116={model.gialai_65116}
                                                        binhphuoc_65116={model.binhphuoc_65116}
                                                        cantho_65116={model.cantho_65116}
                                                        danang_65116={model.danang_65116}
                                                        quangtri_65116={model.quangtri_65116}
                                                        hungyen_65116={model.hungyen_65116}
                                                        tayninh_65116={model.tayninh_65116}
                                                        pda_65116={model.pda_65116}

                                                        nvl_65117={model.nvl_65117}
                                                        vungtau_65117={model.vungtau_65117}
                                                        daklak_65117={model.daklak_65117}
                                                        lamdong_65117={model.lamdong_65117}
                                                        dongnai_65117={model.dongnai_65117}
                                                        gialai_65117={model.gialai_65117}
                                                        binhphuoc_65117={model.binhphuoc_65117}
                                                        cantho_65117={model.cantho_65117}
                                                        danang_65117={model.danang_65117}
                                                        quangtri_65117={model.quangtri_65117}
                                                        hungyen_65117={model.hungyen_65117}
                                                        tayninh_65117={model.tayninh_65117}
                                                        pda_65117={model.pda_65117}

                                                        nvl_c57={model.nvl_c57}
                                                        vungtau_c57={model.vungtau_c57}
                                                        daklak_c57={model.daklak_c57}
                                                        lamdong_c57={model.lamdong_c57}
                                                        dongnai_c57={model.dongnai_c57}
                                                        gialai_c57={model.gialai_c57}
                                                        binhphuoc_c57={model.binhphuoc_c57}
                                                        cantho_c57={model.cantho_c57}
                                                        danang_c57={model.danang_c57}
                                                        quangtri_c57={model.quangtri_c57}
                                                        hungyen_c57={model.hungyen_c57}
                                                        tayninh_c57={model.tayninh_c57}
                                                        pda_c57={model.pda_c57}
                                                    />

                                                ))}
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 4 ?
                                            <div>
                                                <h6 className='title'>Biểu đồ kinh doanh 12 tháng</h6>
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
                                                <div className="text-right">
                                                    <button type="button" className="btn btn-primary" onClick={OnClickLineChart}>
                                                        Biểu đồ cột
                                                </button>
                                                </div>
                                            </div> :
                                            <div></div>
                                        }
                                        {flag === 5 ?
                                            <div>
                                                <h6 className='title'>Biểu đồ xe đã bán</h6>
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
                                                <div className="text-right">
                                                    <button type="button" className="btn btn-primary" onClick={OnClickPieChart}>
                                                        Biểu đồ cột ngang
                                                </button>
                                                </div>
                                            </div> :
                                            <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>{content}</div>
            }
        </>
    )
}