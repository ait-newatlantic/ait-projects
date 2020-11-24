import React, { useState } from 'react'
import Axios from 'axios'
import { Button } from "react-bootstrap";
import 'react-pro-sidebar/dist/css/styles.css';
import api from "../../api/index"

export default function Thongbao() {
    const [content, setContent] = useState("");

    const Submit = () => {
        api.post("/api/post/thongbao", {
            content: content,
            employee: "Admin"

        }).then((response) => {
            return response.data;
        }).catch(error => {
            return alert(error);
        });
    }

    return (
        <div className="container p-3 my-3 border border-dark">
            <div className="head">
                <img src="https://www.newatlantic.vn/images/logos/ait_logo.jpg" alt="logo" width="100" height="100" />
                <h1>FORM TẠO THÔNG BÁO</h1>
            </div>
            <div className="container p-3 my-3 border border-dark" >
                <label for="exampleFormControlTextarea1"><strong>Nội dung</strong></label>
                <textarea type="content" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setContent(e.target.value)}></textarea>
            </div>
            <div className="container p-3 my-3 border border-dark" >
                <Button variant="success" block type="submit" onClick={Submit}>
                    Gửi thông báo
                    </Button>
            </div>
        </div>
    )
}