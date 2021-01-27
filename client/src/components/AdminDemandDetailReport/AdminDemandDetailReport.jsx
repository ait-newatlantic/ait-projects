import React, { useEffect, useState } from 'react'
import "./style.css"
import DemandService from "../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import SearchIcon from '@material-ui/icons/Search';

export default function AdminDemandDetailReport(props) {

    const [fromdate, setFromDate] = useState(props.fromdate);
    const [todate, setToDate] = useState(props.todate);
    const [datetype, setDateType] = useState('');
    const [yearResult, setYearResult] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const [content, setContent] = useState("");
    const [total, setTotal] = useState(0);
    const [flag, setFlag] = useState(0);
    const [branch, setBranch] = useState("");
    const [num, setNum] = useState(0);

    const getDate = () => {
        const employee = branch
        DemandService.get_date(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const getUpdatedAt = () => {
        const employee = branch
        DemandService.get_updateAt(employee, fromdate, todate).then((response) => {
            hideLoader()
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const getCreatedAt = () => {
        const employee = branch
        DemandService.get_createAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const getGoAt = () => {
        const employee = branch
        DemandService.get_goAt(employee, fromdate, todate).then((response) => {
            setYearResult(response.data);
            setTotal(response.data.length)
            console.log(response.data)
        });
    }

    const Submit = () => {
        if (datetype === "Ngày tạo form") {
            getCreatedAt()
        }
        else if (datetype === "Ngày cập nhật gần nhất") {
            getUpdatedAt()
        }
        else if (datetype === "Ngày đi thực tế") {
            getGoAt()
        }
        else {
            getDate()
        }
    }

    const onChangeBranch = (e) => {
        const branch = e.target.value;
        setBranch(branch);
        DemandService.get_demands(branch).then((response) => {
            setYearResult(response.data)
            setTotal(response.data.length)
            setNum(num)
        })
    }

    const onChangeDateType = (e) => {
        const datetype = e.target.value;
        setDateType(datetype);
    };

    const onChangeFromDate = (e) => {
        const fromdate = e.target.value;
        setFromDate(fromdate);
    };

    const onChangeToDate = (e) => {
        const todate = e.target.value;
        setToDate(todate);
    };

    const OnClickSearchTool = () => {
        if (flag == 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
    }

    const FetchDemand = () => {
        showLoader()
        const branch = ""
        DemandService.get_demands(branch).then((response) => {
            hideLoader()
            setYearResult(response.data)
            setTotal(response.data.length)
            setNum(num)
        })
    }

    useEffect(() => {
        FetchDemand()
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
        <>
            {loader}
            {content == "Admin" ?
                <div>
                    <div className="card-header text-white" style={{ backgroundColor: "#24305E" }}>
                        <div className="row">
                            <div className="col-sm">
                                BÁO CÁO KINH DOANH CHI TIẾT ({total} RECORDS TỪ {fromdate} ĐẾN {todate})
                                    </div>
                            <div className="col-sm text-right">
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="emp"
                                    filename="Báo cáo kinh doanh"
                                    sheet="Sheet"
                                    buttonText="Export excel"
                                />

                                <button type="button" className="btn btn-success" style={{marginLeft:"5px"}} onClick={OnClickSearchTool}>
                                    Tra cứu nâng cao
                                                </button>
                            </div>
                        </div>
                    </div>
                    {flag == 1 ?
                        <div>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row">
                                        <label className="col-lg-4">Loại ngày</label>
                                        <select className="form-control col-sm" id="exampleFormControlSelect1" onChange={onChangeDateType}>
                                            <option defaultValue="">Click để chọn</option>
                                            <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                            <option defaultValue="Ngày cập nhật gần nhất">Ngày cập nhật gần nhất</option>
                                            <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                            <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <label className="col-lg-4" >Từ ngày</label>
                                        <input className="form-control col-sm" type="date"
                                            id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <label className="col-lg-4" >Đến ngày</label>
                                        <input type="date" className="form-control col-sm"
                                            id="exampleFormControlInput1" onChange={onChangeToDate} />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <button type="button" className="btn btn-primary" onClick={Submit}>
                                        <SearchIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row">
                                        <label className="col-lg-4" >Chi nhánh</label>
                                        <select className="form-control col-sm" name="branch" id="branch" onChange={onChangeBranch}>
                                            <option value="">Total</option>
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
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">

                                </div>
                            </div>
                        </div>
                        :
                        <div></div>
                    }
                    <div className="table-container">
                        <table id="emp" className="table-lg" >
                            <thead>
                                <tr id="titles" key="a">
                                    <th rowSpan="1">STT</th>
                                    <th colSpan="1">Chi nhánh</th>
                                    <th colSpan="1">Thông tin người nhập</th>
                                    <th colSpan="7">Thông tin khách hàng</th>
                                    <th colSpan="4">Thông tin xe</th>
                                    <th colSpan="4">Thông tin thêm</th>
                                    <th colSpan="1">Chức năng</th>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th></th>
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
                                    <th>Ngày đi thực tế</th>
                                    <th>Ngày tạo form</th>
                                    <th>Ngày cập nhật gần nhất</th>
                                    <th>Ghi chú</th>
                                    <th>Cập nhật</th>
                                </tr>
                            </thead>
                            <tbody >
                                {!!yearResult && yearResult.map((form, index) => (
                                    <tr className="content" key={form.id}>
                                        <td>{index + 1}</td>
                                        <td>{form.employee.split('.')[0]}</td>
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
                                        <td>{form.date}</td>
                                        <td>{form.createdAt.substring(0, 10)}</td>
                                        <td>{form.updatedAt.substring(0, 10)}</td>
                                        <td>{form.note}</td>
                                        <td>
                                            <a className="btn btn-warning btn-sm" href={`/dashboard/demands/update/${form.id}`} role="button">Cập nhật</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div>{content}</div>
            }
        </>
    )
}
