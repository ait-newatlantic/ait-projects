import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import Home from "../home/Home"

const Home1 = () => {
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
        <div className="container-fuild">
            <Home/>
        </div>
    );
};

export default Home1;