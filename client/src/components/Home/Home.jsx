import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import "./style.css"

const Home = () => {
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
            <div className="container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                        <form className="item-center">
                            <h1>CÔNG TY CỔ PHẦN TMQT TÂN ĐẠI TÂY DƯƠNG</h1>
                            <img src="https://www.thuvienvector.com/upload/images/items/vector-nam-moi-2021-trau-vang-tan-suu-3818.webp" alt="newyear_logo" style={{maxHeight:"10rem"}}/>
                            <h5>Phần mềm doanh nghiệp AIT</h5>
                            <h6>Chúc mừng năm mới Tân Sửu 2021. Chúc mọi người năm mới sức khỏe dẻo dai, công việc thuận lợi thăng tiến dài dài, phi những nước đại tiến tới thành công.</h6>
                            <hr />
                            <a href="/about">
                                <button type="button" className="btn btn-warning">
                                    Tìm hiểu thêm
                            </button>{" "}
                            </a>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Home;