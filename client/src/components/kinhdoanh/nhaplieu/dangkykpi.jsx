import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";
import { ProvinceContext } from '../../../context/province/ProvinceContext'
import { ModelContext } from '../../../context/model/ModelContext'
import { TypeContext } from '../../../context/type/TypeContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import AuthService from "../../../services/auth.service";
import "./style.css"

export default function NCTT() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [branch, setBranch] = useState("");
    const [employee, setEmployee] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("");
    const [customer, setCustomer] = useState("");
    const [customer_number, setCustomer_Number] = useState("");
    const [customer_type, setCustomer_Type] = useState("");
    const [customer_area, setCustomer_Area] = useState("");
    const [color, setColor] = useState("");
    const [ait, setAit] = useState("");
    const [kmt, setKmt] = useState("");
    const [note, setNote] = useState("");

    //const [branches, setBranches] = useContext(BranchContext);
    const [models, setModels] = useContext(ModelContext);
    const [provinces, setProvinces] = useContext(ProvinceContext);
    const [types, setTypes] = useContext(TypeContext);

    const [customer_comment, setCustomer_Comment] = useState(false);

    //Bo chi nhanh, them nguoi nhap, chinh lại ngày tháng thực tế(DATETIME)
    //them id thang nam ngay, id khach hang,
    //table nhucauthuc te them col-smumn id_nguoinhap, id_khachhang, flag: DONE or FAILED theo đợt
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const Submit = () => {
        Axios.post("http://localhost:8080/api/post/nhaplieu/nhucauthucte", {
            month: month,
            year: year,
            branch: branch,
            employee: employee,
            model: model,
            type: type,
            quantity: quantity,
            status: status,
            customer: customer,
            customer_number: customer_number,
            customer_type: customer_type,
            customer_area: customer_area,
            color: color,
            ait: ait,
            kmt: kmt,
            note: note,
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div className="container p-3 my-3 border border-dark">
            <div className="head">
                <img src="https://www.newatlantic.vn/images/logos/ait_logo.jpg" alt="logo" width="100" height="100" />
                <h1>FORM NHẬP NHU CẦU THỰC TẾ</h1>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin khách hàng</strong></p>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Tên khách hàng</label>
                        <input type="customer" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >SĐT khách hàng</label>
                        <input type="customer_number" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Number(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Khu vực khách hàng</label>
                        <Autocomplete
                            size="small"
                            value={customer_area}
                            onChange={(event, newValue) => {
                                setCustomer_Area(newValue);
                            }}
                            options={provinces.map((option) => option.province_name)}
                            renderInput={(params) => <TextField {...params} label="Tỉnh thành" variant="outlined" />}
                        />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Giai đoạn</label>
                        <select className="form-control" id="exampleFormControlSelect1" onClick={e => setStatus(e.target.value)}>
                            <option value="" selected disabled hidden>Click để chọn</option>
                            <option value="TIẾP CẬN CHÀO HÀNG">TIẾP CẬN CHÀO HÀNG</option>
                            <option value="ĐÀM PHÁN">ĐÀM PHÁN</option>
                            <option value="CHỐT ĐƠN HÀNG">CHỐT ĐƠN HÀNG</option>
                            <option value="ĐÃ CỌC">ĐÃ CỌC</option>
                            <option value="LÊN HỢP ĐỒNG">LÊN HỢP ĐỒNG</option>
                            <option value="ĐÃ THANH TOÁN TẠM ỨNG">ĐÃ THANH TOÁN TẠM ỨNG</option>
                            <option value="HOÀN TẤT GIAO DỊCH">HOÀN TẤT GIAO DỊCH</option>
                            <option value="BÀN GIAO CHƯA THANH TOÁN">BÀN GIAO CHƯA THANH TOÁN</option>
                            <option value="GIAO DỊCH THẤT BẠI">GIAO DỊCH THẤT BẠI</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Loại khách hàng</label>
                        <select className="form-control" id="exampleFormControlSelect1" 
                        onchange="if (value=='ĐÃ SỬ DỤNG KAMAZ'){form['ĐÃ SỬ DỤNG KAMAZ'].style.visibility='visible'}else {form['ĐÃ SỬ DỤNG KAMAZ'].style.visibility='hidden'};"
                        onClick={e => setCustomer_Type(e.target.value)}>
                            <option value="" selected disabled hidden>Click để chọn</option>
                            <option value="DỰ KIẾN">DỰ KIẾN</option>
                            <option value="TIỀM NĂNG">TIỀM NĂNG</option>
                            <option value="ĐÃ SỬ DỤNG KAMAZ">ĐÃ SỬ DỤNG KAMAZ</option>
                        </select>
                    </div>
                        <div className="col-sm-9" id="ykien-khachhang">
                            <label for="exampleFormControlTextarea1">Ý kiến khách hàng (Đối với khách hàng đã sử dụng xe Kamaz)</label>
                            <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setNote(e.target.value)}></textarea>
                        </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Phương thức liên lạc</label>
                        <select className="form-control" id="exampleFormControlSelect1" onClick={e => setCustomer_Type(e.target.value)}>
                            <option value="" selected disabled hidden>Click để chọn</option>
                            <option value="DỰ KIẾN">GẶP TRỰC TIẾP</option>
                            <option value="TIỀM NĂNG">QUA ĐIỆN THOẠI</option>
                            <option value="THÂN THIẾT">QUA EMAIL/CHAT(ZALO,...)</option>
                        </select>
                    </div>
                    <div className="col-sm-9" id="diadiem-giaodich">
                        <label for="exampleFormControlTextarea1">Địa điểm giao dịch (Đối với trường hợp gặp trực tiếp)</label>
                        <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setNote(e.target.value)}></textarea>
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin xe</strong></p>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Model xe</label>
                        <Autocomplete
                            size="small"
                            value={model}
                            onChange={(event, newValue) => {
                                setModel(newValue);
                            }}
                            options={models.map((option) => option.model_name)}
                            renderInput={(params) => <TextField {...params} label="Model xe" variant="outlined" />}
                        />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Loại xe</label>
                        <Autocomplete
                            size="small"
                            value={type}
                            onChange={(event, newValue) => {
                                setType(newValue);
                            }}
                            options={types.map((option) => option.type_name)}
                            renderInput={(params) => <TextField {...params} label="Loại xe" variant="outlined" />}
                        />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Số lượng</label>
                        <input type="quantity" className="form-control" id="exampleFormControlInput1" onChange={e => setQuantity(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Màu yêu cầu</label>
                        <select className="form-control" id="exampleFormControlSelect1" onClick={e => setColor(e.target.value)}>
                            <option value="" selected disabled hidden>Click để chọn</option>
                            <option value="Cam">Cam</option>
                            <option value="Trắng">Trắng</option>
                            <option value="Vàng">Vàng</option>
                            <option value="Xanh">Xanh</option>
                            <option value="Xanh quân đội">Xanh quân đội</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <label for="exampleFormControlTextarea1"><strong>Ghi chú</strong></label>
                <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setNote(e.target.value)}></textarea>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin người đi thực tế & ngày tháng</strong></p>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Người đi thực tế</label>
                        <input type="employee" className="form-control" id="exampleFormControlInput1" onChange={e => setEmployee(e.target.value)} />
                    </div>

                    <div className="col-sm">
                        <label for="example-date-input" >Ngày đi thực tế</label>
                        <input class="form-control" type="date" id="example-date-input" />
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <label for="exampleInputFile">Upload ảnh</label>
                <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                <small id="fileHelp" class="form-text text-muted">Yêu cầu đính kèm theo ảnh minh chứng</small>

                <Button block type="submit" onClick={Submit}>
                    Gửi form
                    </Button>

            </div>

            <div className="container p-3 my-3 border border-dark">
                <label for="exampleFormControlTextarea1"><strong>GIẢI THÍCH LOẠI KHÁCH HÀNG</strong></label>
                <p>DỰ KIẾN: chỉ mới tiếp cận và chào hàng</p>
                <p>TIỀM NĂNG: Họ có nhu cầu và dự định sử dụng sản phẩm của mình, sau khi được chào hàng</p>
                <p>ĐÃ SỬ DỤNG KAMAZ: Khách hàng đã và đang sử dụng sản phẩm của mình </p>
            </div>
        </div>
    )
}