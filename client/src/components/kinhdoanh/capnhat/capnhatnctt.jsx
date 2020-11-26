import React, { useState, useContext, useEffect } from 'react'
import { Button } from "react-bootstrap";
import api from "../../../api/index"
import logo from "../../../static/imgs/ait_logo.jpg"


export default function CN_NCTT(props) {
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [ait, setAit] = useState("");
    const [kmt, setKmt] = useState("");
    const [note, setNote] = useState("");

    const [forms, setForms] = useState([]);

    const FetchData = async () => {
        const id = props.match.params.id // lay id tu URL
        api.get(`/api/get/nhucauthucte/id`, {
            params: {
                id,
            }
        }).then((response) => {
            setForms(response.data);
            response.data.forEach(value => {
                setDate(value.date);
                setStatus(value.status);
                setColor(value.color)
                setAit(value.ait)
                setKmt(value.kmt)
                setNote(value.note)
            })
            console.log(response.data)
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

    const SubmitForm = () => {
        api.put("/api/update/nhucauthucte", {
            id: props.match.params.id,
            color: color,
            date: date,
            status: status,
            ait: ait,
            kmt: kmt,
            note: note,
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
                <h1>FORM CẬP NHẬT NHU CẦU THỰC TẾ</h1>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin khách hàng</strong></p>
                <div className="row">

                </div>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Tên khách hàng</label>
                        <div className="row">
                            <div className="col-sm">
                                {!!forms && forms.map(form => (
                                   <input type="customer" className="form-control" value={form.customer} id="exampleFormControlInput1"/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >SĐT khách hàng</label>
                        {!!forms && forms.map(form => (
                             <input type="customer_number" className="form-control" value={form.customer_number} id="exampleFormControlInput1"/>
                        ))}
                    </div>

                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Khu vực khách hàng</label>
                        {!!forms && forms.map(form => (
                             <input type="customer_area" className="form-control" value={form.customer_area} id="exampleFormControlInput1"/>
                        ))}
                    </div>

                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Giai đoạn</label>
                        {!!forms && forms.map(form => (
                            <select className="form-control" id="exampleFormControlSelect1" style={{background:"#add8e6"}} onChange={e => setStatus(e.target.value)}>
                                <option value="" selected disabled hidden>{form.status}</option>
                                <option value="TIẾP CẬN CHÀO HÀNG">TIẾP CẬN CHÀO HÀNG</option>
                                <option value="CHẠY THỬ">CHẠY THỬ</option>
                                <option value="ĐÀM PHÁN">ĐÀM PHÁN</option>
                                <option value="CHỐT ĐƠN HÀNG">CHỐT ĐƠN HÀNG</option>
                                <option value="ĐÃ CỌC">ĐÃ CỌC</option>
                                <option value="LÊN HỢP ĐỒNG">LÊN HỢP ĐỒNG</option>
                                <option value="ĐÃ THANH TOÁN TẠM ỨNG">ĐÃ THANH TOÁN TẠM ỨNG</option>
                                <option value="HOÀN TẤT GIAO DỊCH">HOÀN TẤT GIAO DỊCH</option>
                                <option value="BÀN GIAO CHƯA THANH TOÁN">BÀN GIAO CHƯA THANH TOÁN</option>
                                <option value="GIAO DỊCH THẤT BẠI">GIAO DỊCH THẤT BẠI</option>
                            </select>
                        ))}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Loại khách hàng</label>
                        {!!forms && forms.map(form => (
                             <input type="customer_type" className="form-control" value={form.customer_type} id="exampleFormControlInput1"/>
                        ))}
                    </div>
                    <div className="col-sm-9" id="ykien-khachhang">
                        <label for="exampleFormControlTextarea1">Ý kiến khách hàng (Đối với khách hàng đã sử dụng xe Kamaz)</label>
                        {!!forms && forms.map(form => (
                            <textarea type="customer_opinion"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                value={form.customer_opinion}
                                rows="3"
                            ></textarea>
                        ))}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1" >Phương thức liên lạc</label>
                        {!!forms && forms.map(form => (
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option value="" selected disabled hidden>{form.customer_communication}</option>
                            <option value="GẶP TRỰC TIẾP">GẶP TRỰC TIẾP</option>
                            <option value="QUA ĐIỆN THOẠI">QUA ĐIỆN THOẠI</option>
                            <option value="QUA EMAIL/CHAT(ZALO,...)">QUA EMAIL/CHAT(ZALO,...)</option>
                        </select>
                        ))}
                    </div>
                    <div className="col-sm-9" id="diadiem-giaodich">
                        <label for="exampleFormControlTextarea1">Địa điểm giao dịch (Đối với trường hợp gặp trực tiếp)</label>
                        {!!forms && forms.map(form => (
                            <textarea type="customer_meeting"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                value={form.customer_meeting}
                                rows="3"
                            ></textarea>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin xe</strong></p>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Model xe</label>
                        {!!forms && forms.map(form => (
                        <input type="model" className="form-control" value={form.model} id="exampleFormControlInput1"/>
                        ))}
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Loại xe</label>
                        {!!forms && forms.map(form => (
                        <input type="type" className="form-control" value={form.type} id="exampleFormControlInput1"/>
                        ))}
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Số lượng</label>
                        {!!forms && forms.map(form => (
                        <input 
                        type="quantity" 
                        className="form-control" 
                        value={form.quantity}
                        id="exampleFormControlInput1" />
                        ))}
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlSelect1">Màu yêu cầu</label>
                        {!!forms && forms.map(form => (
                        <select className="form-control" id="exampleFormControlSelect1" onChange={e => setColor(e.target.value)} style={{background:"#add8e6"}}>
                            <option value="" selected disabled hidden>Click để chọn</option>
                            <option value="Cam">Cam</option>
                            <option value="Trắng">Trắng</option>
                            <option value="Vàng">Vàng</option>
                            <option value="Xanh">Xanh</option>
                            <option value="Xanh quân đội">Xanh quân đội</option>
                            <option value="Chưa quyết định">Chưa quyết định</option>
                        </select>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <p><strong>Thông tin nhân viên & ngày tháng</strong></p>
                <div className="row">
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Người nhập</label>
                        {!!forms && forms.map(form => (
                        <input type="employee" value={form.employee} className="form-control" id="exampleFormControlInput1" />
                        ))}
                    </div>
                    <div className="col-sm">
                        <label for="exampleFormControlInput1" >Người đi thực tế</label>
                        {!!forms && forms.map(form => (
                        <input type="employee_field" value={form.employee_field} className="form-control" id="exampleFormControlInput1"/>
                        ))}
                    </div>

                    <div className="col-sm">
                        <label for="example-date-input" >Ngày đi thực tế</label>
                        <input className="form-control" type="date" id="example-date-input" style={{background:"#add8e6"}} onChange={e => setDate(e.target.value)} />
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
                                <input type="ait" className="form-control" placeholder={form.ait} id="exampleFormControlInput1" style={{background:"#add8e6"}} onChange={e => setAit(e.target.value)} />
                            ))}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label for="exampleFormControlInput1" >KMT</label>
                            {!!forms && forms.map(form => (
                                <input type="kmt" className="form-control" placeholder={form.kmt} id="exampleFormControlInput1" style={{background:"#add8e6"}} onChange={e => setKmt(e.target.value)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <label for="exampleFormControlTextarea1"><strong>Ghi chú</strong></label>
                {!!forms && forms.map(form => (
                            <textarea type="note"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                placeholder={form.note}
                                rows="3"
                                style={{background:"#add8e6"}}
                                onChange={e => setNote(e.target.value)}
                            ></textarea>
                        ))}
            </div>

            <div className="container p-3 my-3 border border-dark" >
                <label for="exampleInputFile">Upload ảnh</label>
                <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                <small id="fileHelp" className="form-text text-muted">Yêu cầu đính kèm theo ảnh minh chứng</small>

                <Button variant="success" block type="submit" onClick={Submit}>
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


