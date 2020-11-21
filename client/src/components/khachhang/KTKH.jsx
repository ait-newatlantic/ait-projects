import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";
import { ProvinceContext } from '../../context/province/ProvinceContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-pro-sidebar/dist/css/styles.css';

export default function KTKH() {
    const [employee, setEmployee] = useState("");
    const [customer, setCustomer] = useState("");
    const [customer_number, setCustomer_Number] = useState("");
    const [customer_type, setCustomer_Type] = useState("");
    const [customer_area, setCustomer_Area] = useState("");
    const [color, setColor] = useState("");
    const [ait, setAit] = useState("");
    const [kmt, setKmt] = useState("");
    const [note, setNote] = useState("");

    //const [branches, setBranches] = useContext(BranchContext);
    const [provinces, setProvinces] = useContext(ProvinceContext);

    //Bo chi nhanh, them nguoi nhap, chinh lại ngày tháng thực tế(DATETIME)
    //them id thang nam ngay, id khach hang,
    //table nhucauthuc te them col-smumn id_nguoinhap, id_khachhang, flag: DONE or FAILED theo đợt
    const Submit = () => {
        Axios.post("http://localhost:8080/api/post/nhaplieu/nhucauthucte", {
            employee: employee,
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
                <h1>FORM KHỞI TẠO KHÁCH HÀNG</h1>
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
                        <label for="exampleFormControlInput1" >Mã số thuế</label>
                        <input type="customer" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer(e.target.value)} />
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
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <label for="exampleFormControlTextarea1"><strong>Ghi chú</strong></label>
                <textarea type="note" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setNote(e.target.value)}></textarea>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <Button variant="success" block type="submit" onClick={Submit}>
                    Gửi form
                    </Button>
            </div>
        </div>
    )
}