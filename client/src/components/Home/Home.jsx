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
                            <h1>Phần mềm doanh nghiệp AIT</h1>
                            <h1 style={{fontFamily: 'Dancing Script'}}>Chúc mừng năm mới Tân Sửu 2021</h1>
                            <img src="https://www.thuvienvector.com/upload/images/items/vector-nam-moi-2021-trau-vang-tan-suu-3818.webp" alt="newyear_logo" style={{maxHeight:"10rem"}}/>
                            <h1 style={{fontFamily: 'Dancing Script'}}>An khang - Thịnh Vượng</h1>
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