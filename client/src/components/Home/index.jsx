import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

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
        <div className="container mx-auto">
            <header className="jumbotron">
                <h3 className="mb-4 uppercase font-bold">{content} Content</h3>
                <p>Xin chào đến với phần mềm dự án AIT</p>
                <p>Chọn Dashboard trên thanh điều hướng để sử dụng phần mềm</p>
            </header>
        </div>
    );
};
export default Home;