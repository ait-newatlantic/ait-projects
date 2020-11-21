import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";
import { BranchContext } from '../../../context/branch/BranchContext'
import { ProvinceContext } from '../../../context/province/ProvinceContext'
import { ModelContext } from '../../../context/model/ModelContext'
import { TypeContext } from '../../../context/type/TypeContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router-dom';

export default function CN_NCTT(props) {
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

    const [branches, setBranches] = useContext(BranchContext);
    const [models, setModels] = useContext(ModelContext);
    const [provinces, setProvinces] = useContext(ProvinceContext);
    const [types, setTypes] = useContext(TypeContext);

    const [forms, setForms] = useState([]);

    const FetchData = async () =>{
        const id = props.match.params.id // lay id tu URL
        Axios.get(`http://localhost:8080/api/get/nhucauthucte/id`, {
            params: {
               id,
            }
        }).then((response) => {
            setForms(response.data);
        });
    }

    const Submit = () => {
        Axios.put("http://localhost:8080/api/update/nhucauthucte", {
            id:  props.match.params.id,
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

    useEffect(()=>{
        FetchData()
        return()=>{
        }
    },[]) 

    return (
        <div>
            <div className="container p-3 my-3 border border-dark">
                <form>
                    <div className="head">
                            <img src="https://www.newatlantic.vn/images/logos/ait_logo.jpg" alt="logo" width="100" height="100" />
                            <h1>FORM CẬP NHẬT NHU CẦU THỰC TẾ</h1>
                    </div>
                    <div className="container p-3 my-3 border border-dark" >
                        <p><strong>Thông tin nhân viên, chi nhánh & ngày tháng</strong></p>
                        <div className="row">
                            <div className="col">
                                <div className="form">
                                    <label for="exampleFormControlSelect1">Chi nhánh</label>
                                    <Autocomplete
                                        size="small"
                                        value={branch}
                                        onChange={(event, newValue) => {
                                            setBranch(newValue);
                                        }}
                                        options={branches.map((option) => option.branch_name)}
                                        renderInput={(params) => <TextField {...params} label={forms.map((option) => option.branch)} variant="outlined" />}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >Tên nhân viên</label>
                                    {!!forms && forms.map(form => (
                                    <input type="employee" className="form-control" placeholder={form.employee} id="exampleFormControlInput1" onChange={e => setEmployee(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Tháng</label>
                                    <select className="form-control" id="exampleFormControlInput1" onClick={e => setMonth(e.target.value)}>
                                    {!!forms && forms.map(form => (
                                        <option value="" selected disabled hidden>{form.month}</option>
                                        ))}
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Năm</label>
                                    {!!forms && forms.map(form => (
                                    <input type="year" className="form-control" placeholder={form.year} id="exampleFormControlInput1 " onChange={e => setYear(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container p-3 my-3 border border-dark" >
                        <p><strong>Thông tin khách hàng</strong></p>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >Tên khách hàng</label>
                                    {!!forms && forms.map(form => (
                                    <input type="customer" className="form-control" placeholder={form.customer} id="exampleFormControlInput1" onChange={e => setCustomer(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >SĐT khách hàng</label>
                                    {!!forms && forms.map(form => (
                                    <input type="customer_number" className="form-control" placeholder={form.customer_number} id="exampleFormControlInput1" onChange={e => setCustomer_Number(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1" >Loại khách hàng</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onClick={e => setCustomer_Type(e.target.value)}>
                                    {!!forms && forms.map(form => (
                                        <option value="" selected disabled hidden>{form.customer_type}</option>
                                    ))}
                                        <option value="DỰ KIẾN">DỰ KIẾN</option>
                                        <option value="TIỀM NĂNG">TIỀM NĂNG</option>
                                        <option value="THÂN THIẾT">THÂN THIẾT</option>
                                        <option value="CŨ">CŨ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Khu vực khách hàng</label>
                                    <Autocomplete
                                        size="small"
                                        value={customer_area}
                                        onChange={(event, newValue) => {
                                            setCustomer_Area(newValue);
                                        }}
                                        options={provinces.map((option) => option.province_name)}
                                        renderInput={(params) => <TextField {...params} label={forms.map((option) => option.customer_area)} variant="outlined" />}
                                    />
                                </div>
                            </div>
                            {/* <div className="col">
                                    <div className="form-group">
                                        <label for="exampleFormControlSelect1">Tỉnh thành</label>
                                        <select className="form-control" id="exampleFormControlInput1" onClick={e => setCustomer_Area(e.target.value)}>
                                            {provinces.map(province => (
                                                <option value={province.province_name}>{province.province_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div> */}
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1" >Giai đoạn</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onClick={e => setStatus(e.target.value)}>
                                        {!!forms && forms.map(form => (
                                        <option value="" selected disabled hidden>{form.status}</option>
                                        ))}
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
                        </div>
                    </div>

                    <div className="container p-3 my-3 border border-dark" >
                        <p><strong>Thông tin xe</strong></p>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Model xe</label>
                                    <Autocomplete
                                        size="small"
                                        value={model}
                                        onChange={(event, newValue) => {
                                            setModel(newValue);
                                        }}
                                        options={models.map((option) => option.model_name)}
                                        renderInput={(params) => <TextField {...params} label={forms.map((option) => option.model)} variant="outlined" />}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Loại xe</label>
                                    <Autocomplete
                                        size="small"
                                        value={type}
                                        onChange={(event, newValue) => {
                                            setType(newValue);
                                        }}
                                        options={types.map((option) => option.type_name)}
                                        renderInput={(params) => <TextField {...params} label={forms.map((option) => option.type)} variant="outlined" />}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >Số lượng</label>
                                    {!!forms && forms.map(form => (
                                    <input type="quantity" className="form-control" placeholder={form.quantity} id="exampleFormControlInput1" onChange={e => setQuantity(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Màu yêu cầu</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onClick={e => setColor(e.target.value)}>
                                    {!!forms && forms.map(form => (  
                                        <option value="" selected disabled hidden>{form.color}</option>
                                    ))}
                                        <option value="Cam">Cam</option>
                                        <option value="Trắng">Trắng</option>
                                        <option value="Vàng">Vàng</option>
                                        <option value="Xanh">Xanh</option>
                                        <option value="Xanh quân đội">Xanh quân đội</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container p-3 my-3 border border-dark" >
                        <p><strong>Thông tin thêm</strong></p>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >AIT</label>
                                    {!!forms && forms.map(form => (
                                    <input type="ait" className="form-control" placeholder={form.ait} id="exampleFormControlInput1" onChange={e => setAit(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >KMT</label>
                                    {!!forms && forms.map(form => (
                                    <input type="kmt" className="form-control" placeholder={form.kmt} id="exampleFormControlInput1" onChange={e => setKmt(e.target.value)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container p-3 my-3 border border-dark" >
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Tình trạng hiện tại</label>
                            {!!forms && forms.map(form => (
                            <textarea type="note" className="form-control" placeholder={form.note} id="exampleFormControlTextarea1" rows="3" onChange={e => setNote(e.target.value)}></textarea>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <Button block type="submit" onClick={Submit}>
                            Cập nhật
                                    </Button>
                    </div>
                </form>
            </div>


            <div className="container p-3 my-3 border border-dark">
                <label for="exampleFormControlTextarea1"><strong>GIẢI THÍCH LOẠI KHÁCH HÀNG</strong></label>
                <p>DỰ KIẾN: chỉ mới tiếp cận và chào hàng</p>
                <p>TIỀM NĂNG: Họ có nhu cầu và dự định sử dụng sản phẩm của mình, sau khi được chào hàng</p>
                <p>THÂN THIẾT: Khách hàng đã sử dụng sản phẩm của mình và thường xuyên mua hàng khi có nhu cầu. Họ trung thành với sản phẩm dịch vụ, sẵn sàng thử nghiệm sản phẩm dịch vụ mới. Sẵn sàng ủng hộ</p>
                <p>CŨ: đã hết hứng thú với sản phẩm, dịch vụ của mình, hoặc đã lâu không giao dịch.</p>
            </div>

        </div>
    )
}