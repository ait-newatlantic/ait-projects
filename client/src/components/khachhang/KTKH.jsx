import React, { useState, useContext } from 'react'
import { Button } from "react-bootstrap";
import { ProvinceContext } from '../../context/province/ProvinceContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-pro-sidebar/dist/css/styles.css';
import api from "../../api/index"
import logo from "../../static/imgs/ait_logo.jpg"

export default function KTKH() {
    const [customer, setCustomer] = useState("");
    const [customer_number, setCustomer_Number] = useState("");
    const [customer_representative, setCustomer_Representative] = useState("");
    const [customer_representative_number, setCustomer_Representative_Number] = useState("");
    const [customer_representative_email, setCustomer_Representative_Email] = useState("");
    const [customer_taxcode, setCustomer_Taxcode] = useState("");
    const [customer_type, setCustomer_Type] = useState("");
    const [customer_area, setCustomer_Area] = useState("");
    const [customer_address, setCustomer_Address] = useState("");

    //const [branches, setBranches] = useContext(BranchContext);
    const [provinces, setProvinces] = useContext(ProvinceContext);

    //Bo chi nhanh, them nguoi nhap, chinh lại ngày tháng thực tế(DATETIME)
    //them id thang nam ngay, id khach hang,
    //table nhucauthuc te them col-smumn id_nguoinhap, id_khachhang, flag: DONE or FAILED theo đợt
    const SubmitForm = () => {
        api.post("/api/post/khachhang", {
            customer: customer,
            customer_taxcode: customer_taxcode,
            customer_representative: customer_representative,
            customer_representative_number: customer_representative_number,
            customer_representative_email: customer_representative_email,
            customer_number: customer_number,
            customer_type: customer_type,
            customer_area: customer_area,
            customer_address: customer_address,
        }).then((response) => {
            return response.data;
        }).catch(error => {
            return alert(error);
        });
    }

    const Alert1 = () => {
        return (
            alert("Success")
        )
    }
    
    const Submit = () => {
        SubmitForm()
        Alert1()
    }

    return (
        <div className="container p-3 my-3 border border-dark">
            <div className="head">
                <img src={logo} alt="logo" width="100" height="100" />
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
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Mã số thuế</label>
                        <input type="customer_taxcode" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Taxcode(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Tên người đại diện</label>
                        <input type="customer_representative" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Representative(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >SĐT người đại diện</label>
                        <input type="customer_representative_number" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Representative_Number(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Email người đại diện</label>
                        <input type="customer_representative_email" className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Representative_Email(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Loại khách hàng</label>
                        <select className="form-control" id="exampleFormControlSelect1"
                            onchange="if (value=='ĐÃ SỬ DỤNG KAMAZ'){form['ĐÃ SỬ DỤNG KAMAZ'].style.visibility='visible'}else {form['ĐÃ SỬ DỤNG KAMAZ'].style.visibility='hidden'};"
                            onClick={e => setCustomer_Type(e.target.value)}>
                            <option value="" selected disabled hidden>Click để chọn</option>
                            <option value="DOANH NGHIỆP">DOANH NGHIỆP</option>
                            <option value="TƯ NHÂN">TƯ NHÂN</option>
                        </select>
                    </div>
                    <div className="col-sm-9">
                        <label for="exampleFormControlTextarea1">Địa chỉ khách hàng</label>
                        <textarea type="customer_address" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setCustomer_Address(e.target.value)}></textarea>
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <Button variant="success" block type="submit" onClick={Submit}>
                    Gửi form
                    </Button>
            </div>
        </div>
    )
}