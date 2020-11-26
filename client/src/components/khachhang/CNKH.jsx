import React, { useState, useContext, useEffect } from 'react'
import { Button } from "react-bootstrap";
import { ProvinceContext } from '../../context/province/ProvinceContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'react-pro-sidebar/dist/css/styles.css';
import api from "../../api/index"
import logo from "../../static/imgs/ait_logo.jpg"

export default function CNKH(props) {
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

    const [forms, setForms] = useState([]);

    const FetchData = async () => {
        const id = props.match.params.id // lay id tu URL
        api.get(`/api/get/khachhang/id`, {
            params: {
                id,
            }
        }).then((response) => {
            setForms(response.data);
            response.data.forEach(value => {
                setCustomer(value.customer)
                setCustomer_Number(value.customer_number)
                setCustomer_Representative(value.customer_representative)
                setCustomer_Representative_Number(value.customer_representative_number)
                setCustomer_Representative_Email(value.customer_representative_email)
                setCustomer_Taxcode(value.customer_taxcode)
                setCustomer_Type(value.customer_type)
                setCustomer_Area(value.customer_area)
                setCustomer_Address(value.setCustomer_Address)
            })
            console.log(response.data)
        });
    }

    const Alert1 = () => {
        return (
            alert("Gửi form thành công!!!")
        )
    }

    const Submit = () => {
        SubmitForm()
        Alert1()
    }

    const SubmitForm = () => {
        api.put("/api/update/khachhang", {
            id: props.match.params.id,
            customer: customer,
            customer_area: customer_area,
            customer_taxcode: customer_taxcode,
            customer_address: customer_address,
            customer_number: customer_number,
            customer_representative: customer_representative,
            customer_representative_email: customer_representative_email,
            customer_representative_number: customer_representative_number,
            customer_type: customer_type,

        }).then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {
        FetchData()
        return () => {
        }
    }, [])

    return (
        <div className="container p-3 my-3 border border-dark">
            <div className="head">
                <img src={logo} alt="logo" width="100" height="100" />
                <h1>FORM CẬP NHẬT KHÁCH HÀNG</h1>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin khách hàng</strong></p>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Tên khách hàng</label>
                        <input type="customer" placeholder={customer} className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >SĐT khách hàng</label>
                        <input type="customer_number" placeholder={customer_number} className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Number(e.target.value)} />
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
                        <input type="customer_taxcode" placeholder={customer_taxcode} className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Taxcode(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Tên người đại diện</label>
                        <input type="customer_representative" placeholder={customer_representative} className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Representative(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >SĐT người đại diện</label>
                        <input type="customer_representative_number" placeholder={customer_representative_email} className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Representative_Number(e.target.value)} />
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Email người đại diện</label>
                        <input type="customer_representative_email" placeholder={customer_representative_email} className="form-control" id="exampleFormControlInput1" onChange={e => setCustomer_Representative_Email(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Loại khách hàng</label>
                        <select className="form-control" id="exampleFormControlSelect1"
                            onchange="if (value=='ĐÃ SỬ DỤNG KAMAZ'){form['ĐÃ SỬ DỤNG KAMAZ'].style.visibility='visible'}else {form['ĐÃ SỬ DỤNG KAMAZ'].style.visibility='hidden'};"
                            onClick={e => setCustomer_Type(e.target.value)}>
                            <option value="" selected disabled hidden>{customer_type}</option>
                            <option value="DOANH NGHIỆP">DOANH NGHIỆP</option>
                            <option value="TƯ NHÂN">TƯ NHÂN</option>
                        </select>
                    </div>
                    <div className="col-sm-9">
                        <label for="exampleFormControlTextarea1">Địa chỉ khách hàng</label>
                        {!!forms && forms.map(form => (
                        <textarea
                            type="customer_address"
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            placeholder={form.customer_address}
                            rows="3"
                            onChange={e => setCustomer_Address(e.target.value)}>
                        </textarea>
                        ))}
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