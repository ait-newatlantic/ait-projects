import React, { useEffect, useState } from "react"
import "./style.css"
import UserService from "../../services/user.service";

export default function Error() {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="err-container">
            <div className="err">
                <h1>Lỗi!</h1>
                <p>404 - Trang không tồn tại</p>
            </div>
        </div>
    )
}