import React, { useState, useContext, useEffect } from 'react'
import { Button } from "react-bootstrap";
import { BranchContext } from '../../../context/branch/BranchContext'
import { ProvinceContext } from '../../../context/province/ProvinceContext'
import { ModelContext } from '../../../context/model/ModelContext'
import { TypeContext } from '../../../context/type/TypeContext'
import api from "../../../api/index"
import logo from "../../../static/imgs/ait_logo.jpg"

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
        api.get(`/api/get/nhucauthucte/id`, {
            params: {
               id,
            }
        }).then((response) => {
            setForms(response.data);
        });
    }

    const Submit = () => {
        api.put("/api/update/nhucauthucte", {
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
                            <img src={logo} alt="logo" width="100" height="100" />
                            <h1>FORM CẬP NHẬT NHU CẦU THỰC TẾ</h1>
                    </div>
                    <div className="container p-3 my-3 border border-dark" >
                        <p><strong>Thông tin khách hàng</strong></p>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label for="exampleFormControlInput1" >Tên khách hàng</label>
                                    {!!forms && forms.map(form => (
                                    <input type="customer" className="form-control" value={form.customer} id="exampleFormControlInput1" onChange={e => setCustomer(e.target.value)} />
                                    ))}
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