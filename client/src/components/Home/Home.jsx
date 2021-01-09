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
        <div>
            <div className="container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                        <form className="item-center">
                            <h1>CÔNG TY CỔ PHẦN TMQT TÂN ĐẠI TÂY DƯƠNG</h1>
                            <h5>Phần mềm doanh nghiệp AIT</h5>
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
        </div>
    );
};

export default Home;