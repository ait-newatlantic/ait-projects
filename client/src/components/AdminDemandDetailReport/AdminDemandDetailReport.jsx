import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import "./style.css"
import DemandService from "../../services/demand.service"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BranchChart from "../BranchChart/BranchChart"
import CarChart from "../CarChart/CarChart"
import useFullPageLoader from "../../services/loader.service"
import UserService from "../../services/user.service";
import SearchIcon from '@material-ui/icons/Search';

export default function AdminDemandDetailReport() {

    const [fromdate, setFromDate] = useState('2020-01-01');
    const [todate, setToDate] = useState('2030-01-01');
    const [datetype, setDateType] = useState('');
    const [yearResult, setYearResult] = useState();
    const [yearResult2, setYearResult2] = useState();
    const [yearResult3, setYearResult3] = useState();
    const [loader, showLoader, hideLoader] = useFullPageLoader()
    const [content, setContent] = useState("");
    const [total, setTotal] = useState(0);
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
        DemandService.get_createAt(employee ,fromdate, todate).then((response) => {
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
            FetchDemandModels()
            FetchDemandQuantity()
        }
        else if (datetype === "Ngày cập nhật gần nhất") {
            getUpdatedAt()
            FetchDemandModels()
            FetchDemandQuantity()
        }
        else if (datetype === "Ngày đi thực tế") {
            getGoAt()
            FetchDemandModels()
            FetchDemandQuantity()
        }
        else {
            getDate()
            FetchDemandModels()
            FetchDemandQuantity()
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

    const FetchDemand = () => {
        const branch = ""
        DemandService.get_demands(branch).then((response) => {
            setYearResult(response.data)
            setTotal(response.data.length)
            setNum(num)
        })
    }

    const FetchDemandModels = () => {
        showLoader()
        DemandService.get_all_models(
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult2(response.data)
        })
    }

    const FetchDemandQuantity = () => {
        showLoader()
        DemandService.get_all_quantity(
            fromdate,
            todate,
        ).then((response) => {
            hideLoader()
            setYearResult3(response.data)
        })
    }

    useEffect(() => {
        FetchDemand()
        FetchDemandModels()
        FetchDemandQuantity()
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
            <div className="custom">
                {content == "Admin" ?
                    <div>
                        <div className="card-deck">
                            <div className="card">
                                <h5><SearchIcon /></h5>
                                <div>
                                    <label htmlFor="exampleFormControlSelect1">Loại ngày</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={onChangeDateType}>
                                        <option defaultValue="">Click để chọn</option>
                                        <option defaultValue="Ngày tạo form">Ngày tạo form</option>
                                        <option defaultValue="Ngày cập nhật gần nhất">Ngày cập nhật gần nhất</option>
                                        <option defaultValue="Ngày đi thực tế">Ngày đi thực tế</option>
                                        <option defaultValue="Tất cả các ngày">Tất cả các ngày</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" >Từ ngày</label>
                                        <input type="date" className="form-control"
                                            id="exampleFormControlInput1" onChange={onChangeFromDate} />
                                    </div>
                                </div>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" >Đến ngày</label>
                                        <input type="date" className="form-control"
                                            id="exampleFormControlInput1" onChange={onChangeToDate} />
                                    </div>
                                </div>
                                <div>
                                    <Button block type="submit" onClick={Submit}>
                                        Tra cứu
                        </Button>
                                </div>
                            </div>
                            <div className="card">
                                <h5>BIỂU ĐỒ ĐÁNH GIÁ KINH DOANH TỪNG CHI NHÁNH</h5>
                                {!!yearResult2 && yearResult2.map(model => (
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
                                        binhduong_6540={model.binhduong_6540}
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
                                        binhduong_6460={model.binhduong_6460}
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
                                        binhduong_43253={model.binhduong_43253}
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
                                        binhduong_43265={model.binhduong_43265}
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
                                        binhduong_43266={model.binhduong_43266}
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
                                        binhduong_53228={model.binhduong_53228}
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
                                        binhduong_53229={model.binhduong_53229}
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
                                        binhduong_65115={model.binhduong_65115}
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
                                        binhduong_65116={model.binhduong_65116}
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
                                        binhduong_65117={model.binhduong_65117}
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
                                        binhduong_c57={model.binhduong_c57}
                                        tayninh_c57={model.tayninh_c57}
                                        pda_c57={model.pda_c57}
                                    />

                                ))}
                            </div>
                            <div className="card">
                                <h5>BIỂU ĐỒ ĐÁNH GIÁ SỐ LƯỢNG XE ĐÃ BÁN</h5>
                                {!!yearResult3 && yearResult3.map(quantity => (
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
                            </div>
                        </div>
                        <br />
                        <div className="card">
                            <h5>BÁO CÁO KINH DOANH CHI TIẾT</h5>
                            <h6>Tổng số lượng records: {total}</h6>
                            <h6>
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="emp"
                                    filename="Báo cáo kinh doanh"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                            </h6>
                            <div className="table-container">
                                <table id="emp" className="table-lg" >
                                    <thead>
                                        <tr id="titles" key="a">
                                            <th rowSpan="1">STT</th>
                                            <th colSpan="1">Chi nhánh</th>
                                            <th colSpan="1">Thông tin nhân viên</th>
                                            <th colSpan="7">Thông tin khách hàng</th>
                                            <th colSpan="4">Thông tin xe</th>
                                            <th colSpan="4">Thông tin thêm</th>
                                            <th colSpan="1">Chức năng</th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>
                                            <select name="branch" id="branch" onChange={onChangeBranch}>
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
                                            </th>
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
                                                    <a className="btn btn-warning btn-sm" href={`/demands/update/${form.id}`} role="button">Cập nhật</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <div>{content}</div>
                }
            </div>
            {loader}
        </>
    )
}