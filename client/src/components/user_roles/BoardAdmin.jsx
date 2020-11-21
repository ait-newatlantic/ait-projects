import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Sidebar from "../sidebar/Sidebar"
import Notification from "../notification/Notification"

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="row">
            <div className="col-sm"><Sidebar/></div>
            <div className="col-10"><Notification/></div>
        </div>
    );
};

export default BoardAdmin;